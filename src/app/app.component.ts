import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WidgetComponent } from './dev/widget/widget.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WidgetComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
