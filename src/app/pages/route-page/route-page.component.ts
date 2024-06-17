import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteHeaderComponent } from '../../components/route-header/route-header.component';
import { MapComponent } from '../../components/map/map.component';

@Component({
  selector: 'app-route-page',
  standalone: true,
  imports: [RouteHeaderComponent, MapComponent],
  templateUrl: './route-page.component.html',
})
export class RoutePageComponent implements OnInit {
  public id: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const { id } = params;
      this.id = id;
    });
  }
}
