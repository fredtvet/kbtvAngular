import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Timesheet } from 'src/app/shared/models';
import * as moment from 'moment';

@Component({
  selector: 'app-timesheet-card',
  templateUrl: './timesheet-card.component.html',
  styleUrls: ['./timesheet-card.component.scss']
})
export class TimesheetCardComponent implements OnInit {

  @Input() timesheet: Timesheet;
  @Output() hasConfirmed = new EventEmitter();
  @Output() hasDeleted = new EventEmitter();

  startDate: moment.Moment;
  endDate: moment.Moment;
  duration: moment.Duration;

  constructor() { }

  ngOnInit() {
    this.startDate = moment(this.timesheet.startTime);
    this.endDate = moment(this.timesheet.endTime);
    this.calcDifference();
  }

  calcDifference(){
    this.duration = moment.duration(this.endDate.diff(this.startDate));
  }

}
