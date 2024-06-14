import { Component } from '@angular/core';
import { MapComponent } from '../../components/map/map.component';

@Component({
  selector: 'app-route-page',
  standalone: true,
  imports: [MapComponent],
  templateUrl: './route-page.component.html',
  styleUrl: './route-page.component.scss',
})
export class RoutePageComponent {}
