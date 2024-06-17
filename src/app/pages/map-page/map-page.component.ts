import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouteShortComponent } from '../../components/route-short/route-short.component';
import { SearchComponent } from '../../components/search/search.component';
import { TabsComponent } from '../../components/tabs/tabs.component';
import { MapComponent } from '../../components/map/map.component';
import { ApiYmapsService } from '../../services/api-ymaps.service';

@Component({
  selector: 'app-map-page',
  standalone: true,
  imports: [RouteShortComponent, SearchComponent, TabsComponent, MapComponent],
  templateUrl: './map-page.component.html',
})
export class MapPageComponent implements OnInit, OnDestroy {
  constructor(private apiYmaps: ApiYmapsService) {}

  ngOnInit(): void {
    this.apiYmaps.init();
  }

  ngOnDestroy(): void {
    this.apiYmaps.suggestDestroy();
  }
}
