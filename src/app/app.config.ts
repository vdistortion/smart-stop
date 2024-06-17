import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';
import { routes } from './app.routes';
import { environment } from '../environments/environment';

const mapConfig: YaConfig = {
  apikey: environment.API_YANDEX_MAPS,
  suggest_apikey: environment.API_YANDEX_MAPS_SUGGEST,
  lang: 'ru_RU',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(AngularYandexMapsModule.forRoot(mapConfig)),
  ],
};
