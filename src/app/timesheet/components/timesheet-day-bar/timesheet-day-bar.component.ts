import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { TimesheetInfo } from 'src/app/shared/models';
import { DateParams } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-timesheet-day-bar',
  templateUrl: './timesheet-day-bar.component.html',
  styleUrls: ['./timesheet-day-bar.component.scss']
})
export class TimesheetDayBarComponent implements OnInit {

  @Input() dateParams: DateParams;
  @Input() timesheetInfo: TimesheetInfo = new TimesheetInfo();

  @Output() progressClick = new EventEmitter();
  @Output() addClick = new EventEmitter();

  date: moment.Moment;
  today = moment();
  totalHoursOpen = 0;
  totalHoursClosed = 0;

  constructor() { }

  ngOnInit(): void {
    this.totalHoursOpen = this.timesheetInfo.calcTotalHoursOpen();
    this.totalHoursClosed = this.timesheetInfo.calcTotalHoursClosed();
    this.calcDate();
  }

  ngOnChanges(changes: SimpleChanges): void{
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'timesheetInfo':{
            this.totalHoursOpen = this.timesheetInfo.calcTotalHoursOpen();
            this.totalHoursClosed = this.timesheetInfo.calcTotalHoursClosed();
          }
          case 'year':
          case 'weekNr':
          case 'weekDay':{
            this.calcDate();
          }
        }
      }
    }
  }

  calcDate(): void{
    this.date = moment()
    .year(this.dateParams.year)
    .week(this.dateParams.weekNr)
    .isoWeekday(this.dateParams.weekDay);
  }


}
