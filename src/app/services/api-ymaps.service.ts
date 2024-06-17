import { Injectable } from '@angular/core';
import { YaApiLoaderService } from 'angular8-yandex-maps';
import { Subject } from 'rxjs';
import { type LatLngExpression } from 'leaflet';

export type Route = {
  duration: string;
  distance: string;
  list: string[];
  coords: LatLngExpression[];
};

@Injectable({
  providedIn: 'root',
})
export class ApiYmapsService {
  public routes$: Subject<Route[]> = new Subject<Route[]>();
  public activeRoute$: Subject<Route> = new Subject<Route>();
  public suggestDestroy: () => void = () => null;

  constructor(private ymapsService: YaApiLoaderService) {}

  init(
    elementId: string = 'suggest',
    stopCoords: number[] = [55.16041, 61.40567],
  ) {
    this.ymapsService.load().subscribe((ymaps) => {
      const suggestView = new ymaps.SuggestView(elementId, {
        provider: {
          suggest(request) {
            // @ts-ignore
            return ymaps.suggest('Челябинск, ' + request);
          },
        },
      });

      const callback = (e: any) => {
        ymaps.geocode(e.get('item').value).then((res: any) => {
          this.drawingPaths(ymaps, res, stopCoords);
        });
      };

      suggestView.events.add('select', callback);

      this.suggestDestroy = () => {
        suggestView.events.remove('select', callback);
        suggestView.destroy();
      };
    });
  }

  drawingPaths(ymaps: any, res: any, stopCoords: number[]) {
    const newPath = res.geoObjects.get(0).properties.get('boundedBy');
    const coord1 = (newPath[1][0] - newPath[0][0]) / 2 + newPath[0][0];
    const coord2 = (newPath[1][1] - newPath[0][1]) / 2 + newPath[0][1];
    const toCoords = [coord1, coord2];

    ymaps
      .route([stopCoords, toCoords], {
        routingMode: 'masstransit',
        mapStateAutoApply: true,
        multiRoute: true,
      })
      .then((routes: any) => {
        const list: Route[] = [];
        for (let i = 0; i < routes.getRoutes().getLength(); i++) {
          const route = routes.getRoutes().get(i);
          const item: Route = {
            duration: route.properties.get('duration').text,
            distance: route.properties.get('distance').text,
            list: [],
            coords: [],
          };
          list[i] = item;
          this.createRoute(route, item);
        }

        if (list.length) this.activeRoute$.next(list[0]);
        this.routes$.next(list);
      });
  }

  createRoute(route: any, temp_i: any) {
    for (let i = 0, l = route.getPaths().getLength(); i < l; i++) {
      const path = route.getPaths().get(i);
      for (let j = 0, k = path.getSegments().getLength(); j < k; j++) {
        const point = path.getSegments().get(j).properties;
        const geometry = path.getSegments().get(j).geometry;

        if (point.get('transports')) {
          temp_i.list.push(point.get('text'));
          temp_i.coords.push(...geometry.getCoordinates());
          point
            .get('transports')
            .forEach((transport: { type: string; name: string }) => {
              const transports: Record<string, string> = {
                tramway: 'Трамвай',
                trolleybus: 'Троллейбус',
                bus: 'Автобус',
                minibus: 'Маршрутка',
              };
              console.log(transports[transport.type] + ': ' + transport.name);
            });
        }
      }
    }
  }
}
