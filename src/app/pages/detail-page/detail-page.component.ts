import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouteHeaderComponent } from '../../components/route-header/route-header.component';
import { RouteDetailComponent } from '../../components/route-detail/route-detail.component';
import { ApiStaticService } from '../../services/api-static.service';

@Component({
  selector: 'app-detail-page',
  standalone: true,
  imports: [RouteHeaderComponent, RouteDetailComponent],
  templateUrl: './detail-page.component.html',
})
export class DetailPageComponent implements OnInit {
  public id: string = '';
  public stops: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiStatic: ApiStaticService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const { id } = params;
      this.id = id;
    });

    this.apiStatic.json$.subscribe((json: any) => {
      if (!json) return;

      const shapes = json.shapes[this.id];
      this.stops = shapes
        .map((shape: number[]) => shape.join('_'))
        .filter((shape: string) => {
          return json.stops[shape];
        })
        .map((shape: string) => json.stops[shape].name.replaceAll('"', ''));
    });
  }
}
