import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, first, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiStaticService {
  private ID: string = '199';
  public json$: BehaviorSubject<Record<string, any> | null> =
    new BehaviorSubject<Record<string, any> | null>(null);

  constructor(private http: HttpClient) {}

  getStatic(route: string) {
    return this.http.get(`api/${route}.txt`, { responseType: 'text' }).pipe(
      map((value) => value.split('\n')),
      map((value) => value.map((string) => string.split(','))),
      map(([head, ...array]) =>
        array.map((string) =>
          head.reduce(
            (acc: Record<string, string>, header: string, key: number) => {
              acc[header] = string[key];
              return acc;
            },
            {},
          ),
        ),
      ),
      first(),
    );
  }

  getAll() {
    return forkJoin({
      stops: this.getStatic('stops'),
      stop_times: this.getStatic('stop_times'),
      trips: this.getStatic('trips'),
      shapes: this.getStatic('shapes'),
      routes: this.getStatic('routes'),
    }).subscribe((obj) => {
      const json: Record<string, any> = {
        stop: {},
        stops: {},
        shapes: {},
        routes: [],
      };

      obj['stops']
        .filter((stop) => this.ID === stop['stop_id'])
        .forEach((stop) => {
          json['stop'] = {
            name: stop['stop_name'],
            coords: [Number(stop['stop_lat']), Number(stop['stop_lon'])],
          };
        });

      const new_times = obj['stop_times']
        .filter((value) => this.ID === value['stop_id'])
        .map((value) => value['trip_id']);

      const new_trips: Record<string, string[]> = {};
      const new_shapes: Record<string, string[]> = {};

      new_times.forEach((time) => {
        obj['trips']
          .filter((trip) => trip['trip_id'] === time)
          .forEach((trip) => {
            if (!Array.isArray(trip['route_id'])) {
              new_trips[trip['route_id']] = [];
            }

            new_trips[trip['route_id']].push(trip['shape_id']);
            new_shapes[trip['route_id']] = [
              ...new Set(new_trips[trip['route_id']]),
            ];
          });
      });

      Object.entries(new_shapes).forEach(([key, new_shape]) => {
        new_shape.forEach(($new) => {
          obj['shapes']
            .filter((shape) => shape['shape_id'] === $new)
            .forEach((shape) => {
              if (!json['shapes'][key]) json['shapes'][key] = [];

              json['shapes'][key].push([
                Number(shape['shape_pt_lat']),
                Number(shape['shape_pt_lon']),
              ]);

              obj['stops']
                .filter(
                  (stop) =>
                    stop['stop_lat'] === shape['shape_pt_lat'] &&
                    stop['stop_lon'] === shape['shape_pt_lon'],
                )
                .forEach((stop) => {
                  json['stops'][stop['stop_lat'] + '_' + stop['stop_lon']] = {
                    name: stop['stop_name'],
                    coords: [
                      Number(stop['stop_lat']),
                      Number(stop['stop_lon']),
                    ],
                  };
                });
            });
        });
      });

      Object.keys(new_trips).forEach((trip) => {
        obj['routes']
          .filter((route) => route['route_id'] === trip)
          .forEach((route) => {
            const arRoute = route['route_id'].split('_');
            json['routes'].push({
              id: route['route_id'],
              name: route['route_short_name'],
              route: route['route_long_name'],
              type: arRoute[1] === 'seasonalbus' ? 'bus' : arRoute[1],
            });
          });
      });

      this.json$.next(json);
    });
  }
}
