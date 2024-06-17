import { Component, Input } from '@angular/core';
import { SimplebarAngularModule } from 'simplebar-angular';

@Component({
  selector: 'app-route-detail',
  standalone: true,
  imports: [SimplebarAngularModule],
  templateUrl: './route-detail.component.html',
  styleUrl: './route-detail.component.scss',
})
export class RouteDetailComponent {
  @Input() public stops: string[] = [];
}
