import { Component } from '@angular/core';
import { RouteShortComponent } from '../../components/route-short/route-short.component';
import { SearchComponent } from '../../components/search/search.component';
import { MapComponent } from '../../components/map/map.component';

@Component({
  selector: 'app-map-page',
  standalone: true,
  imports: [RouteShortComponent, SearchComponent, MapComponent],
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.scss',
})
export class MapPageComponent {}
