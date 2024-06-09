import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  public date: string;
  public time: {
    hour: string;
    minute: string;
    literal: string;
  };

  constructor() {
    this.date = this.newDate().date;
    this.time = this.newDate().time;
  }

  ngOnInit() {
    setInterval(() => {
      this.date = this.newDate().date;
      this.time = this.newDate().time;
    }, 1000);
  }

  format(options: Object, toParts: boolean = false, date = new Date()) {
    const dateTime = new Intl.DateTimeFormat('ru', options);

    if (!toParts) return dateTime.format(date);

    return dateTime.formatToParts(date).reduce((acc: any, curr) => {
      acc[curr.type] = curr.value;
      return acc;
    }, {});
  }

  newDate() {
    return {
      date: this.format({
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'short',
      }),
      time: this.format(
        {
          hour: 'numeric',
          minute: 'numeric',
        },
        true,
      ),
    };
  }
}
