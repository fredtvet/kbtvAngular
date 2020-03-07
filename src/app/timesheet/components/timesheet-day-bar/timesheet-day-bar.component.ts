import { Component, OnInit, Input, SimpleChanges, SimpleChange, Output, EventEmitter } from '@angular/core';
import { TimesheetStatus } from '../../../shared/timesheet-status.enum';
import { Timesheet } from '../../../shared/models/timesheet.model';
import * as moment from 'moment';

@Component({
  selector: 'app-timesheet-day-bar',
  templateUrl: './timesheet-day-bar.component.html',
  styleUrls: ['./timesheet-day-bar.component.scss']
})
export class TimesheetDayBarComponent implements OnInit {

  @Input() weekDay: number;
  @Input() weekNr: number;
  @Input() year: number;
  @Input() status: TimesheetStatus;
  @Input() timesheets: Timesheet[] = [];

  @Output() progressClick = new EventEmitter();
  @Output() addClick = new EventEmitter();

  color = 'primary';
  icon = 'add';
  date: moment.Moment;
  today = moment();
  totalHours = 0;

  constructor() { }

  ngOnInit(): void {
    this.switchState(this.status);
    this.calcTotalHours();
    this.calcDate();
  }

  ngOnChanges(changes: SimpleChanges): void{
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'status': {
            this.switchState(this.status)
          }
          case 'timesheets':{
            this.calcTotalHours();
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

  switchState(status: TimesheetStatus): void{
    switch(status){
      case TimesheetStatus.Open:
        this.color = 'primary';
        this.icon = 'add';
        break;
      case TimesheetStatus.Confirming:
        this.color = 'primary';
        this.icon = 'update';
        break;
      case TimesheetStatus.Confirmed:
        this.color = 'warn';
        this.icon = 'locked';
        break;
    }
  }

  calcTotalHours(): void{
    this.totalHours = 0; //reset
    this.timesheets.forEach(x => {
      let end = moment(x.endTime); //Consider initalizing moment globally with setter?
      let start = moment(x.startTime);
      this.totalHours += moment.duration(end.diff(start)).asHours()
    })
  }

  calcDate(): void{
    this.date = moment().year(this.year).week(this.weekNr).day(this.weekDay);
  }


}
