import { Component } from '@angular/core';
import { SimplebarAngularModule } from 'simplebar-angular';
import { routeDetail } from '../../data/routes';

@Component({
  selector: 'app-route-detail',
  standalone: true,
  imports: [SimplebarAngularModule],
  templateUrl: './route-detail.component.html',
  styleUrl: './route-detail.component.scss',
})
export class RouteDetailComponent {
  routes = routeDetail;
}
