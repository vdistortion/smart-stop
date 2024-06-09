import { Component } from '@angular/core';
import { RouteListComponent } from '../../components/route-list/route-list.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouteListComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
