import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
})
export class TabsComponent {
  public active: number = 0;
  public tabs: [number, string][] = [
    [
      12,
      `автобусы №2, 4, 64, 83. маршрутки №123, 128, 22, 261, 3, 50, 54, 64, 78, 86. троллейбусы №1, 10, 17, 19, 2, 26, 8 до остановки "алое поле" (около 2 мин в пути)`,
    ],
    [
      17,
      `автобус №51. маршрутки №17, 35, 40, 48, 53, 68. троллейбусы №12, 7 до остановки "областная больница" (около 10 мин в пути)`,
    ],
  ];
}
