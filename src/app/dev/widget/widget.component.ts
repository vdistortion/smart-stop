import { Component } from '@angular/core';
import { RouterLink, Routes } from '@angular/router';
import { routes } from '../../app.routes';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.scss',
})
export class WidgetComponent {
  protected show: boolean = environment.DEBUG;

  protected pages: Routes = routes
    .filter((route) => route.path !== '**')
    .map((route) => ({
      ...route,
      path: route.path?.replace(':type', 'trol').replace(':number', '8'),
    }));
}
