import { Component } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { latLng, marker, tileLayer, divIcon, LatLng } from 'leaflet';
import { ApiYmapsService } from '../../services/api-ymaps.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './map.component.html',
})
export class MapComponent {
  public id: number | string = '8';
  public type: string = 'bus';
  public number: number | string = 18;
  public azimuth: number = 0;
  public center: LatLng = latLng(55.16041, 61.40567);
  public zoom: number = 17;
  public marker = `
    <div class="l-marker l-marker--${this.type}">
      <div
        class="l-marker__img"
        data-id="${this.id}"
        style="'transform: rotate(${this.azimuth}deg)'"
      >
        <svg viewBox="0 0 116 167">
          <g transform="translate(-3043 3887)">
            <circle
              cx="58"
              cy="58"
              r="58"
              transform="translate(3043 -3720) rotate(-90)"
            />
            <path
              d="M0,0H0a57.721,57.721,0,0,1,9.759,32.21A57.72,57.72,0,0,1,0,64.425L50.762,32.211Z"
              transform="translate(3068.789 -3836.239) rotate(-90)"
            />
          </g>
        </svg>
      </div>
      <div class="l-marker__number">
        <span>${this.number}</span>
      </div>
    </div>`;

  public options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '...',
      }),
    ],
    zoom: this.zoom,
    center: this.center,
  };

  public layers = [
    marker(this.center, {
      icon: divIcon({
        className: 'leaflet-div-icon',
        html: this.marker,
        iconSize: [30, 42],
        iconAnchor: [15, 42],
      }),
    }),
  ];

  constructor(private apiYmaps: ApiYmapsService) {
    this.apiYmaps.initMap().subscribe(console.log);
  }
}
