import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteHeaderComponent } from '../../components/route-header/route-header.component';
import { MapComponent } from '../../components/map/map.component';
import { routeList } from '../../data/routes';

@Component({
  selector: 'app-route-page',
  standalone: true,
  imports: [RouteHeaderComponent, MapComponent],
  templateUrl: './route-page.component.html',
  styleUrl: './route-page.component.scss',
})
export class RoutePageComponent {
  public transport;

  constructor(private route: ActivatedRoute) {
    const { type, number } = this.route.snapshot.params;
    this.transport = routeList.find(
      (item) => item.type === type && String(item.number) === number,
    );
  }
}
