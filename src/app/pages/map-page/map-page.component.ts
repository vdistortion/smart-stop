import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouteShortComponent } from '../../components/route-short/route-short.component';
import { SearchComponent } from '../../components/search/search.component';
import { TabsComponent } from '../../components/tabs/tabs.component';
import { MapComponent } from '../../components/map/map.component';
import { ApiYmapsService } from '../../services/api-ymaps.service';
import { ApiStaticService } from '../../services/api-static.service';
import { times } from '../../data/routes';

@Component({
  selector: 'app-map-page',
  standalone: true,
  imports: [RouteShortComponent, SearchComponent, TabsComponent, MapComponent],
  templateUrl: './map-page.component.html',
})
export class MapPageComponent implements OnInit, OnDestroy {
  public routes: any[] = [];

  constructor(
    private apiYmaps: ApiYmapsService,
    private apiStatic: ApiStaticService,
  ) {}

  ngOnInit(): void {
    this.apiStatic.json$.subscribe((json: any) => {
      if (!json) return;
      this.routes = json.routes.map((route: any, key: number) => ({
        ...route,
        time: times[key] ?? 0,
      }));
    });

    this.apiYmaps.init();
  }

  ngOnDestroy(): void {
    this.apiYmaps.suggestDestroy();
  }
}
