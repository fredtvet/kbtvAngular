import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { TimesheetInfo } from 'src/app/shared/models';
import { DateParams } from 'src/app/shared/interfaces';
import { listAnimation } from 'src/app/shared/animations/list.animation';

@Component({
  selector: 'app-timesheet-day-bar',
  templateUrl: './timesheet-day-bar.component.html',
  animations: [listAnimation],
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
    
  }

  ngOnChanges(changes: SimpleChanges): void{
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'timesheetInfo':{
            this.totalHoursOpen = this.timesheetInfo.calcTotalHoursOpen();
            this.totalHoursClosed = this.timesheetInfo.calcTotalHoursClosed();
          }
          case 'dateParams':{
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
