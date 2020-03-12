import { Component } from '@angular/core';
import { IdentityService, TimesheetService } from 'src/app/core/services';
import { TimesheetInfo } from 'src/app/shared/models';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { SubscriptionComponent } from 'src/app/subscription.component';
import { takeUntil, tap, switchMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TimesheetStatus } from 'src/app/shared/enums';
import { DateParams } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-timesheet-week-list',
  templateUrl: './timesheet-week-list.component.html',
  styleUrls: ['./timesheet-week-list.component.scss'],
})
export class TimesheetWeekListComponent extends SubscriptionComponent {

  date = new Date();
  userName: string;

  dateParams: DateParams = { year: moment().year(), weekNr: moment().isoWeek() }
  dateParamsSubject = new BehaviorSubject(this.dateParams)
  dateParams$ = this.dateParamsSubject.asObservable();

  totalWeeks: number;

  timesheetDays: TimesheetInfo[] = [];

  constructor(
    private identityService: IdentityService,
    private timesheetService: TimesheetService,
    private router: Router) {
      super();
      this.userName = this.identityService.getCurrentUser().userName;
    }

  ngOnInit() {
    this.dateParams$.pipe(
      takeUntil(this.unsubscribe),
      switchMap(x => this.timesheetService.getByUserNameAndWeekGrouped$(this.userName, x))
      ).pipe(tap(console.log)).subscribe(data => this.timesheetDays = data)
  }

  dateParamsWithWeekday(weekDay: number): DateParams{
    const dp = this.dateParams;
    dp.weekDay = weekDay;
    return dp;
  }

  confirmAllTimesheets(){
    let ids: number[] = [];
    this.timesheetDays.forEach(x => ids = ids.concat(x.openTimesheets.map(x => x.id)))
    if(ids.length == 0) return undefined;
    this.timesheetService.changeStatuses$(ids, TimesheetStatus.Confirmed).subscribe();
  }

  goToDetails(weekDay: number){
    this.router.navigate(['timeliste', this.dateParams.year, this.dateParams.weekNr, weekDay, 'detaljer'])
  }

  dateParamsChange(dateParams: DateParams){
    this.dateParamsSubject.next(dateParams);
  }
}
