import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SimplebarAngularModule } from 'simplebar-angular';
import { ButtonRouteComponent } from '../button-route/button-route.component';
import { routeList } from '../../data/routes';

@Component({
  selector: 'app-route-list',
  standalone: true,
  imports: [RouterLink, SimplebarAngularModule, ButtonRouteComponent],
  templateUrl: './route-list.component.html',
  styleUrl: './route-list.component.scss',
})
export class RouteListComponent {
  public routeList = routeList;
}
