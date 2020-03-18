import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IdentityService, TimesheetService } from 'src/app/core/services';
import { TimesheetInfo } from 'src/app/shared/models';
import * as moment from 'moment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { SubscriptionComponent } from 'src/app/subscription.component';
import { takeUntil, tap, switchMap, map, shareReplay, take, distinctUntilChanged, share, distinct, skip } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TimesheetStatus } from 'src/app/shared/enums';
import { DateParams } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-timesheet-week-list',
  templateUrl: './timesheet-week-list.component.html',
  styleUrls: ['./timesheet-week-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimesheetWeekListComponent extends SubscriptionComponent {

  date = new Date();
  userName: string;

  dateParams: DateParams = { year: moment().year(), weekNr: moment().week() }
  dateParamsSubject = new BehaviorSubject(this.dateParams)
  dateParams$ = this.dateParamsSubject.asObservable();

  timesheetDays$: Observable<TimesheetInfo[]>

  totalWeeks: number;

  constructor(
    private identityService: IdentityService,
    private timesheetService: TimesheetService,
    private router: Router) {
      super();
      this.userName = this.identityService.getCurrentUser().userName;
  }

  ngOnInit(){
    this.timesheetDays$ = this.dateParams$.pipe( 
      takeUntil(this.unsubscribe),
      switchMap(x => this.timesheetService.getByUserNameAndWeekGrouped$(this.userName, x)),
    );
  }

  dateParamsWithWeekday(weekDay: number): DateParams{
    const dp = this.dateParams;
    dp.weekDay = weekDay;
    return dp;
  }

  confirmAllTimesheets(){ 
    this.timesheetDays$.pipe(take(1),switchMap(arr => {
      let ids: number[] = [];
      arr.forEach(x => ids = ids.concat(x.openTimesheets.map(x => x.id)));
      return this.timesheetService.changeStatuses$(ids, TimesheetStatus.Confirmed);
    })).subscribe();


  }

  goToDetails(weekDay: number){
    this.router.navigate(['timeliste', this.dateParams.year, this.dateParams.weekNr, weekDay, 'detaljer'])
  }

  dateParamsChange(dateParams: DateParams){
    this.dateParamsSubject.next(dateParams);
  }
}
