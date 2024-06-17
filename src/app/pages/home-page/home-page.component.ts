import { Component, OnInit } from '@angular/core';
import { RouteListComponent } from '../../components/route-list/route-list.component';
import { SearchComponent } from '../../components/search/search.component';
import { ApiStaticService } from '../../services/api-static.service';
import { times } from '../../data/routes';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouteListComponent, SearchComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
  public routes: any[] = [];

  constructor(private apiStatic: ApiStaticService) {}

  ngOnInit(): void {
    this.apiStatic.json$.subscribe((json: any) => {
      if (!json) return;
      this.routes = json.routes.map((route: any, key: number) => ({
        ...route,
        time: times[key] ?? 0,
      }));
    });
  }
}
