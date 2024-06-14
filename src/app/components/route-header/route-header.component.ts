import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-route-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './route-header.component.html',
  styleUrl: './route-header.component.scss',
})
export class RouteHeaderComponent {
  @Input({ required: true }) type: string;
  @Input({ required: true }) number: string | number;
  @Input({ required: true }) route: string;
  @Input({ required: true }) page: 'route' | 'detail';
}
