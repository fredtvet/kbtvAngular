import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IdentityService, TimesheetService, SessionService } from 'src/app/core/services';
import { TimesheetInfo, Timesheet } from 'src/app/shared/models';
import * as moment from 'moment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { SubscriptionComponent } from 'src/app/subscription.component';
import { takeUntil, tap, switchMap, map, shareReplay, take, distinctUntilChanged, share, distinct, skip, delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TimesheetStatus, TimesheetFilters } from 'src/app/shared/enums';
import { DateParams } from 'src/app/shared/interfaces';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-timesheet-week-list',
  templateUrl: './timesheet-week-list.component.html',
  styleUrls: ['./timesheet-week-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimesheetWeekListComponent extends SubscriptionComponent {

  date = new Date();
  userName: string;

  dateParamsSubject = new BehaviorSubject<DateParams>({ year: moment().year(), weekNr: 5 })
  dateParams$ = this.dateParamsSubject.asObservable().pipe(distinctUntilChanged());

  timesheetDays$: Observable<Timesheet[][]> =  this.dateParams$.pipe(
    switchMap(x => this.timesheetService.getByUserNameAndWeekGrouped$(this.userName, x)),
    takeUntil(this.unsubscribe),
  );

  timesheetDays: Timesheet[][];

  totalWeeks: number;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay(),
      takeUntil(this.unsubscribe),
    );

  constructor(
    private sessionService: SessionService,
    private breakpointObserver: BreakpointObserver,
    private identityService: IdentityService,
    private timesheetService: TimesheetService,
    private router: Router) {
      super();
      this.userName = this.identityService.getCurrentUser().userName;
      console.time('init');
  }

  ngOnInit(){
    this.timesheetDays$.subscribe(x => this.timesheetDays = x);
  }

  ngAfterViewInit(): void {
    console.timeEnd('init');
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
 
  }

  dateParamsWithWeekday(weekDay: number): DateParams{
    return {...this.dateParamsSubject.value, weekDay: weekDay};
    //return this.dateParams$.pipe(map(x => ({...x, weekDay: weekDay})),tap(console.log))
  }

  confirmAllTimesheets(){ 
    let ids = [].concat(...this.timesheetDays).reduce((acc, timesheet) => {
      if(timesheet.status === TimesheetStatus.Open) acc.push(timesheet.id);
      return acc;
    }, []);
    this.timesheetService.changeStatuses$(ids, TimesheetStatus.Confirmed).subscribe();
  }

  goToDetails(weekDay: number){
    this.sessionService.timesheetDateParams = {...this.dateParamsSubject.value};
    this.sessionService.timesheetDateParams.weekDay = weekDay;
    this.router.navigate(['timeliste/ny', {preset: TimesheetFilters.DateParams}])
  }

  changeDateParams(dateParams: DateParams){
    this.dateParamsSubject.next(dateParams);
  }
  
}
