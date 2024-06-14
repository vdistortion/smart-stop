import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { DebugComponent } from './dev/debug/debug.component';
import { WidgetComponent } from './dev/widget/widget.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, DebugComponent, WidgetComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
