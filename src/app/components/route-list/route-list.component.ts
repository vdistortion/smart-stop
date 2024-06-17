import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SimplebarAngularModule } from 'simplebar-angular';
import { ButtonRouteComponent } from '../button-route/button-route.component';

@Component({
  selector: 'app-route-list',
  standalone: true,
  imports: [RouterLink, SimplebarAngularModule, ButtonRouteComponent],
  templateUrl: './route-list.component.html',
  styleUrl: './route-list.component.scss',
})
export class RouteListComponent {
  @Input({ required: true }) routes: any[];
}
