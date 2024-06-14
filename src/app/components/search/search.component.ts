import { Component, Input } from '@angular/core';
import { ButtonBackComponent } from '../button-back/button-back.component';
import { ButtonSearchComponent } from '../button-search/button-search.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ButtonBackComponent, ButtonSearchComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  @Input() isMapPage: boolean = false;
}
