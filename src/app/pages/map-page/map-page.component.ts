import { Component } from '@angular/core';
import { SearchComponent } from '../../components/search/search.component';

@Component({
  selector: 'app-map-page',
  standalone: true,
  imports: [SearchComponent],
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.scss',
})
export class MapPageComponent {}
