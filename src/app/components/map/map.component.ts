import { Component, OnInit } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import {
  latLng,
  marker,
  tileLayer,
  divIcon,
  LatLng,
  Marker,
  LatLngExpression,
  polyline,
} from 'leaflet';
import { ApiYmapsService, type Route } from '../../services/api-ymaps.service';
import { ApiStaticService } from '../../services/api-static.service';
import { ApiLiveRoutesService } from '../../services/api-live-routes.service';
import { animatedMarker } from '../../data/AnimatedMarker';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './map.component.html',
})
export class MapComponent implements OnInit {
  public center: LatLng = latLng([55.16041, 61.40567]);
  public zoom: number = 17;
  public stopMarker: Marker;
  public isShow: boolean = false;

  public get options() {
    return {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 20,
          attribution: '...',
        }),
      ],
      zoom: this.zoom,
      center: this.center,
      // scrollWheelZoom: false,
      // zoomControl: false,
      // attributionControl: false,
      // closePopupOnClick: false,
    };
  }

  public layers: any[] = [];
  private oldRoutes: Record<string, any> = {};

  constructor(
    private apiLiveRoutes: ApiLiveRoutesService,
    private apiStatic: ApiStaticService,
    private apiYmaps: ApiYmapsService,
  ) {}

  ngOnInit() {
    this.apiYmaps.activeRoute$.subscribe((route: Route) => {
      this.layers = [polyline(route.coords, { color: '#ae81ff', weight: 5 })];
    });

    this.apiLiveRoutes.routes$.subscribe((routes) => {
      const arNew = Object.keys(routes);
      const arOld = Object.keys(this.oldRoutes);
      const add = arNew.filter((el) => !arOld.includes(el));
      const del = arOld.filter((el) => !arNew.includes(el));

      add.forEach((id) => {
        const route = routes[id];
        const marker = animatedMarker([route.coords], {
          icon: divIcon({
            className: 'leaflet-div-icon',
            html: this.markerHtml(
              route.id,
              route.type,
              route.number,
              route.azimuth,
            ),
            iconSize: [30, 42],
            iconAnchor: [15, 42],
          }),
          title: route.name,
          riseOnHover: true,
          interval: 30000,
        });

        this.oldRoutes[id] = {
          route,
          marker,
          coords: [route.coords],
        };
      });

      del.forEach((id) => {
        delete this.oldRoutes[id];
      });

      Object.keys(routes).forEach((key) => {
        if (![...add, ...del].includes(key)) {
          const route = routes[key];
          const moveRoute = this.oldRoutes[key];
          const marker = moveRoute.marker;
          const el: HTMLElement | null = document.querySelector(
            `.l-map [data-id="${key}"]`,
          );
          if (el && route.azimuth)
            el.style.transform = `rotate(${route.azimuth}deg)`;
          moveRoute.coords.push(route.coords);
          if (moveRoute.coords.length > 4) {
            moveRoute.coords.shift();
          }
          if (moveRoute.coords.length > 3) {
            marker.setLine(moveRoute.coords);
            marker.start();
          }
        }
      });

      this.layers = [
        ...Object.values(this.oldRoutes).map((item) => item.marker),
      ];
    });

    this.apiStatic.json$.subscribe((json) => {
      if (json) {
        const { coords, name }: { name: string; coords: LatLngExpression } =
          json['stop'];
        const marshrut = json['shapes']['chelyabinsk_bus_18'];
        const line = polyline(marshrut, { color: '#ae81ff', weight: 5 });
        this.center = latLng(coords);
        this.stopMarker = marker(coords, {
          icon: divIcon({
            html: `
        <div style="
          width: 54px;
          height: 54px;
          box-shadow: 0 11px 13px rgba(0, 0, 0, 0.47);
          border: 5px solid #ffffff;
          background-color: #084ac4;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateX(-50%);
          z-index: 4;
        "></div>
            `,
          }),
        }).bindPopup(
          `
      <div style='text-align: center; color: #084ac4; font-size: 30px; font-weight: 700;'>ВЫ ЗДЕСЬ</div>
      <div style='text-align: center; font-size: 24px;'>${name}</div>`,
          {
            closeButton: false,
            closeOnClick: false,
          },
        );
        this.isShow = true;

        this.layers = [this.stopMarker, line];
      }
    });
  }

  markerHtml(id: string, type: string, number: string, azimuth: string) {
    return `
    <div class="l-marker l-marker--${type}">
      <div
        class="l-marker__img"
        data-id="${id}"
        style="transform: rotate(${azimuth}deg)"
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
        <span>${number}</span>
      </div>
    </div>`;
  }
}
