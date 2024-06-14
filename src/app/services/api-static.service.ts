import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiStaticService {
  constructor(private http: HttpClient) {}

  boardTest(id: number = 3510004) {
    const staticResponse =
      't="14/06/2024 14:44:21" m="АВ90с;4\'" m="АВ14;12\'" m="ТБ16;13\'" m="ТБ7;22\'" m="ТБ12;26\'" s1=1,5,"Мед Академия" ';

    this.http
      .get(`http://chelgortrans.ru:33888/boardTest.aspx?id=${id}`)
      .pipe(catchError(() => of(staticResponse)))
      .subscribe((data) => console.log(data));
  }

  getRoutes() {
    this.http
      .get('https://transport.gis.inf74.ru/getroutes')
      .subscribe(console.log);
  }

  getStatic(route: string): void {
    this.http.get(route, { responseType: 'text' }).subscribe(() => {
      console.log(route);
    });
  }

  getAll() {
    this.getRoutes();
    this.boardTest(3510001);
    this.getStatic('api/stops.txt');
    this.getStatic('api/stop_times.txt');
    this.getStatic('api/trips.txt');
    this.getStatic('api/shapes.txt');
    this.getStatic('api/routes.txt');
  }
}
