import { Component } from '@angular/core';
import { RouteShortComponent } from '../../components/route-short/route-short.component';
import { SearchComponent } from '../../components/search/search.component';
import { TabsComponent } from '../../components/tabs/tabs.component';
import { MapComponent } from '../../components/map/map.component';

@Component({
  selector: 'app-map-page',
  standalone: true,
  imports: [RouteShortComponent, SearchComponent, TabsComponent, MapComponent],
  templateUrl: './map-page.component.html',
})
export class MapPageComponent {}
