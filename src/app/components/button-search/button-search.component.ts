import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button-search',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './button-search.component.html',
  styleUrl: './button-search.component.scss',
})
export class ButtonSearchComponent {}
