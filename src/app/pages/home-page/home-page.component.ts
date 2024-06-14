import { Component } from '@angular/core';
import { RouteListComponent } from '../../components/route-list/route-list.component';
import { SearchComponent } from '../../components/search/search.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouteListComponent, SearchComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {}
