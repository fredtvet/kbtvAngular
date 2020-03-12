import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { listAnimation } from '../../animations/list.animation';

@Component({
  selector: 'app-hour-progress-bar',
  templateUrl: './hour-progress-bar.component.html',
  animations: [listAnimation],
  styleUrls: ['./hour-progress-bar.component.scss']
})
export class HourProgressBarComponent implements OnInit {

  _invalidHours: number = 0;
  invalidHourArray: number[];

  get invalidHours(): number {
      return this._invalidHours;
  }

  @Input('invalidHours')
  set invalidHours(value: number) {
      this.invalidHourArray = this.createHourArray(value);
      this._invalidHours = value;
  }

  _hours: number = 0;
  hourArray: number[] = [];

  get hours(): number {
      return this._hours;
  }

  @Input('hours')
  set hours(value: number) {
    this.hourArray = this.createHourArray(value);
    this._hours = value;
  }

  constructor() { }

  ngOnInit() {
  }

  createHourArray(n: number): any[]{
    const abs = Math.abs(n);
    const rounded = Math.round(abs);
    if(rounded == 0) return Array();
    else return Array(rounded);
  }
}
