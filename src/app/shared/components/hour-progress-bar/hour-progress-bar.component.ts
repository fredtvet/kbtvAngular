import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hour-progress-bar',
  templateUrl: './hour-progress-bar.component.html',
  styleUrls: ['./hour-progress-bar.component.scss']
})
export class HourProgressBarComponent implements OnInit {

  _hours: number;

  get hours(): number {
      return this._hours;
  }

  @Input('hours')
  set hours(value: number) {
      this._hours = value;
      this.setRate();
  }

  visualCap = 10; //visual cap for progress bar in hours

  rate = 0;

  constructor() { }

  ngOnInit() {
    this.setRate()
  }

  setRate(){
    this.rate = (this.hours/this.visualCap)*100;
  }

}
