import { Component } from '@angular/core';
import { ApiYmapsService, type Route } from '../../services/api-ymaps.service';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
})
export class TabsComponent {
  public active: number = 0;
  public tabs: Route[] = [];

  constructor(public apiYmaps: ApiYmapsService) {
    this.apiYmaps.routes$.subscribe((routes: Route[]) => {
      if (Array.isArray(routes))
        this.tabs = routes.filter(
          (route: any) => route.list.length && route.coords.length > 0,
        );
    });
  }

  onClick(index: number) {
    this.active = index;
    this.apiYmaps.activeRoute$.next(this.tabs[index]);
  }
}
