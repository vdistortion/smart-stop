import { Injectable } from '@angular/core';
import { YaApiLoaderService } from 'angular8-yandex-maps';

@Injectable({
  providedIn: 'root',
})
export class ApiYmapsService {
  constructor(private ymapsService: YaApiLoaderService) {}

  initMap() {
    return this.ymapsService.load();
  }
}
