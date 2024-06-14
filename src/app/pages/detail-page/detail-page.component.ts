import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteHeaderComponent } from '../../components/route-header/route-header.component';
import { RouteDetailComponent } from '../../components/route-detail/route-detail.component';
import { routeList } from '../../data/routes';

@Component({
  selector: 'app-detail-page',
  standalone: true,
  imports: [RouteHeaderComponent, RouteDetailComponent],
  templateUrl: './detail-page.component.html',
  styleUrl: './detail-page.component.scss',
})
export class DetailPageComponent {
  public transport;

  constructor(private route: ActivatedRoute) {
    const { type, number } = this.route.snapshot.params;
    this.transport = routeList.find(
      (item) => item.type === type && String(item.number) === number,
    );
  }
}
