import { Component } from '@angular/core';
import { routeList } from '../../data/routes';
import { RouterLink } from '@angular/router';
import { ButtonRouteComponent } from '../button-route/button-route.component';
import { EmptyComponent } from '../empty/empty.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-route-short',
  standalone: true,
  imports: [RouterLink, ButtonRouteComponent, EmptyComponent],
  templateUrl: './route-short.component.html',
  styleUrl: './route-short.component.scss',
})
export class RouteShortComponent {
  public routeList = routeList;

  get routes() {
    return this.routeList.slice(0, environment.COUNT_ROUTE_SHORT_LIST);
  }
}
