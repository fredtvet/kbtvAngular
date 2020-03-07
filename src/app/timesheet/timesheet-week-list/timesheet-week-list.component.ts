import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IdentityService, TimesheetWeekService } from 'src/app/core';
import { TimesheetService } from 'src/app/core/services/data/timesheet.service';
import { Timesheet, TimesheetWeek } from 'src/app/shared';
import * as moment from 'moment';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { SubscriptionComponent } from 'src/app/subscription.component';
import { takeUntil, tap, switchMap, map } from 'rxjs/operators';
import { TimesheetStatus } from 'src/app/shared/timesheet-status.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timesheet-week-list',
  templateUrl: './timesheet-week-list.component.html',
  styleUrls: ['./timesheet-week-list.component.scss'],
  encapsulation : ViewEncapsulation.None,
})
export class TimesheetWeekListComponent extends SubscriptionComponent {

  date = new Date();
  userName: string;

  pageInfo = { year: moment().year(), weekNr: moment().week() }
  pageInfoSubject = new BehaviorSubject(this.pageInfo)
  pageInfo$ = this.pageInfoSubject.asObservable();

  totalWeeks: number;

  timesheetWeek: TimesheetWeek = new TimesheetWeek();

  constructor(
    private identityService: IdentityService,
    private timesheetWeekService: TimesheetWeekService,
    private router: Router) {
      super();
      this.userName = this.identityService.getCurrentUser().userName;
    }

  ngOnInit() {
    this.pageInfo$.pipe(
      takeUntil(this.unsubscribe),
      tap(x => this.setWeeksPerYear(x.year)),
      map(x => this.checkPageInfo(x)),
      switchMap(x => this.timesheetWeekService.getDetailsByUserNameAndWeek$(this.userName, x.weekNr, x.year))
      ).subscribe(data => this.timesheetWeek = data)
  }

  goToDetails(weekDay: number){
    this.router.navigate(['timeliste', this.pageInfo.year, this.pageInfo.weekNr, weekDay, 'detaljer'])
  }

  changeWeek(week: number){
    if(week > this.totalWeeks) this.pageInfo.weekNr = this.totalWeeks;
    else if(week < 1) this.pageInfo.weekNr = 1;
    else this.pageInfo.weekNr = week;
    this.pageInfoSubject.next(this.pageInfo)
  }

  changeYear(year: number){
    if(year < 2000) this.pageInfo.year = 2000;
    if(year > moment().year()) this.pageInfo.year = moment().year();
    else this.pageInfo.year = year;
    this.pageInfoSubject.next(this.pageInfo);
  }

  private setWeeksPerYear(year: number): void{
    this.totalWeeks = moment(year.toString().concat("-12-28")).weeks();
  }

  //Check if current week is higher that total weeks, if so set to latest week.
  //Incase new year has less weeks & current week is too high
  private checkPageInfo(pageInfo: any): any{
    if(pageInfo.weekNr > this.totalWeeks) pageInfo.weekNr = this.totalWeeks;
    return pageInfo;
  }
}
