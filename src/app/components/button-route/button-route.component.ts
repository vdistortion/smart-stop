import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-route',
  standalone: true,
  imports: [],
  templateUrl: './button-route.component.html',
  styleUrl: './button-route.component.scss',
})
export class ButtonRouteComponent {
  @Input({ required: true }) number: string | number;
  @Input({ required: true }) type: string;
  @Input() short: boolean = false;

  get className() {
    const classList = [`btn-route--${this.type}`];
    if (this.short) classList.push('btn-route--short');
    return classList.join(' ');
  }
}
