import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-marker',
  standalone: true,
  imports: [],
  templateUrl: './marker.component.html',
  styleUrl: './marker.component.scss',
})
export class MarkerComponent {
  @Input() id: number | string = '8';
  @Input() type: string = 'trol';
  @Input() number: number | string = 8;
  @Input() azimuth: number = 0;
}
