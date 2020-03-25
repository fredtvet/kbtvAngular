import { Component, Input, SimpleChanges, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import * as moment from 'moment';
import { DateParams } from 'src/app/shared/interfaces';
import { listAnimation } from 'src/app/shared/animations/list.animation';

@Component({
  selector: 'app-timesheet-day-label',
  templateUrl: './timesheet-day-label.component.html',
  animations: [listAnimation],
  styleUrls: ['./timesheet-day-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TimesheetDayLabelComponent {

  @Input() dateParams: DateParams;

  @Output() addClick = new EventEmitter();

    
  date: moment.Moment;
  today = moment();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void{
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'dateParams':{
            this.setDate();
          }
        }
      }
    }
  }

  setDate(): void{
    this.date = moment()
    .year(this.dateParams.year)
    .week(this.dateParams.weekNr)
    .isoWeekday(this.dateParams.weekDay);
  }

}
