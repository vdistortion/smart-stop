import { Component, Input } from '@angular/core';
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
  @Input({ required: true }) routes: any[];

  get routesShort() {
    return this.routes.slice(0, environment.COUNT_ROUTE_SHORT_LIST);
  }
}
