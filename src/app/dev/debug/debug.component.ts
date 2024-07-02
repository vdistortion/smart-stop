import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'dev-debug',
  standalone: true,
  imports: [],
  templateUrl: './debug.component.html',
  styleUrl: './debug.component.scss',
})
export class DebugComponent {
  protected show: boolean = environment.DEBUG;
}
