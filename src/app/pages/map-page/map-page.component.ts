import { Component } from '@angular/core';
import { SearchComponent } from '../../components/search/search.component';
import { RouteShortComponent } from '../../components/route-short/route-short.component';

@Component({
  selector: 'app-map-page',
  standalone: true,
  imports: [SearchComponent, RouteShortComponent],
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.scss',
})
export class MapPageComponent {}
