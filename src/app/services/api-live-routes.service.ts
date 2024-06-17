import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, interval, map, mergeMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiLiveRoutesService {
  public routes$: BehaviorSubject<Record<string, any>> = new BehaviorSubject(
    {},
  );
  constructor(private http: HttpClient) {}

  boardTest(id: number = 3510004) {
    const staticResponse =
      't="14/06/2024 14:44:21" m="АВ90с;4\'" m="АВ14;12\'" m="ТБ16;13\'" m="ТБ7;22\'" m="ТБ12;26\'" s1=1,5,"Мед Академия" ';

    this.http
      .get(`http://chelgortrans.ru:33888/boardTest.aspx?id=${id}`, {
        responseType: 'text',
      })
      .pipe(catchError(() => of(staticResponse)));
  }

  getRoutes() {
    return this.http
      .get('https://transport.gis.inf74.ru/getroutes', {
        responseType: 'text',
      })
      .pipe(
        map((value) => value.split('\n')),
        map(([_, ...value]) => value.map((string) => string.split(','))),
        map((array) => {
          const associations = ['', 'trol', 'bus', 'tram', 'taxi', 'seasonbus'];
          const associations_ru = [
            '',
            'Троллейбус',
            'Автобус',
            'Трамвай',
            'Маршрутка',
            'Садовый автобус',
          ];
          const routes: any[] = [];

          array.forEach((item) => {
            const [typeRaw, number, lngRaw, latRaw, , azimuth, id] = item;
            const [, type] = typeRaw.split('=');
            const lat = latRaw ? Number(latRaw) / 1000000 : Number(latRaw);
            const lng = lngRaw ? Number(lngRaw) / 1000000 : Number(lngRaw);

            if (lat > 0 && lng > 0) {
              routes.push({
                id: id,
                type: associations[Number(type)],
                name: associations_ru[Number(type)],
                number: number,
                coords: [lat, lng],
                azimuth: Number(azimuth),
              });
            }
          });

          return routes;
        }),
      );
  }

  get() {
    return interval(5000)
      .pipe(mergeMap(() => this.getRoutes()))
      .subscribe((array) => {
        const routes: Record<string, any> = {};
        array.forEach((item) => {
          routes[item.id] = item;
        });
        this.routes$.next(routes);
      });
  }
}

// Данные о GPS/ГЛОНАСС-треке передаются в виде набора параметров, в следующем формате:
// -2,103,61385971,55199203,52,177,борт 0171 Нефаз (ва161 74),30.10.2014 9:42:17
// -0 поле - тип транспорта (1 - троллейбус, 2 - автобус, 3 – трамвай, 5 - садовые автобусы, 4 - маршрутки )
// -1 поле - маршрут, по которому едет машина
// -2 поле - х координата машины (longitude) в градусах, умноженных на 1000000
// -3 поле - y координата машины (latitude) в градусах, умноженных на 1000000
// -4 поле - скорость машины
// -5 поле - азимут движения машины в
// -6 поле - номер машины
// -7 поле – дата и время в часовом поясе Челябинска
