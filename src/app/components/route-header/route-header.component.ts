import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiStaticService } from '../../services/api-static.service';

@Component({
  selector: 'app-route-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './route-header.component.html',
  styleUrl: './route-header.component.scss',
})
export class RouteHeaderComponent implements OnInit {
  @Input({ required: true }) id: string;
  @Input({ required: true }) page: 'route' | 'detail';
  public number: string | number;
  public type: string;
  public route: string = '';

  constructor(private apiStatic: ApiStaticService) {}

  ngOnInit() {
    this.apiStatic.json$.subscribe((json) => {
      if (!json) return;

      const data = json['routes'].find((route: any) => route.id === this.id);
      if (data) {
        this.type = data.type;
        this.route = data.route;
        this.number = data.name;
      }
    });
  }
}
