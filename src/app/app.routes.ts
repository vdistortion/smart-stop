import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MapPageComponent } from './pages/map-page/map-page.component';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { RoutePageComponent } from './pages/route-page/route-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: 'Список маршрутов',
  },
  {
    path: 'map',
    component: MapPageComponent,
    title: 'Карта',
  },
  {
    path: 'detail/:type/:number',
    component: DetailPageComponent,
    title: 'Детальная страница маршрута',
  },
  {
    path: 'route/:type/:number',
    component: RoutePageComponent,
    title: 'Детальная карта маршрута',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
