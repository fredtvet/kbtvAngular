import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { TimesheetInfo, Timesheet } from 'src/app/shared/models';
import { DateParams } from 'src/app/shared/interfaces';
import { listAnimation } from 'src/app/shared/animations/list.animation';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SubscriptionComponent } from 'src/app/subscription.component';
import { takeUntil, map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-timesheet-day-bar',
  templateUrl: './timesheet-day-bar.component.html',
  animations: [listAnimation],
  styleUrls: ['./timesheet-day-bar.component.scss']
})

export class TimesheetDayBarComponent extends SubscriptionComponent {

  @Input() dateParams: DateParams;
  @Input() timesheetInfo: TimesheetInfo = new TimesheetInfo();

  @Output() progressClick = new EventEmitter();
  @Output() addClick = new EventEmitter();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      takeUntil(this.unsubscribe),
      map(result => result.matches),
      shareReplay()
    );
    
  date: moment.Moment;
  today = moment();
  totalHoursOpen = 0;
  totalHoursClosed = 0;

  sortedTimesheets: Timesheet[] = [];

  constructor(private breakpointObserver: BreakpointObserver) { super(); }

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

  sortByDate(timesheets: Timesheet[]){
    const t = timesheets;
    return t.sort((a: any, b: any) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );
  }

}
