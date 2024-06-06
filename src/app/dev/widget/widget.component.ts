import { Component } from '@angular/core';
import { RouterLink, Routes } from '@angular/router';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.scss',
})
export class WidgetComponent {
  public pages: Routes = routes.filter((route) => route.path !== '**');
}
