import { Component, OnInit } from '@angular/core';
import { MainNavService, TimesheetService, DateTimeService, UsersService } from 'src/app/core/services';
import { AppButton, TimesheetSummary } from 'src/app/shared/interfaces';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { WeekListFilterSheetWrapperComponent } from '../../shared/components/week-list-filter/week-list-filter-sheet-wrapper.component';
import { filter, tap, map, takeUntil, skip, last, startWith, } from 'rxjs/operators';
import { ActivatedRoute, UrlSegment, Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { SubscriptionComponent } from 'src/app/shared/components/abstracts/subscription.component';
import { GroupByTypes } from 'src/app/shared/enums';
import { UsernameToFullnamePipe } from 'src/app/shared/pipes';

@Component({
  selector: 'app-timesheet-year-list',
  templateUrl: './timesheet-year-list.component.html'
})
export class TimesheetYearListComponent extends SubscriptionComponent {

  innerNavButtons: AppButton[];

  today = new Date();

  userSummaries$: Observable<TimesheetSummary[]>;

  constructor(
    private mainNavService: MainNavService,
    private userNameToFullNamePipe: UsernameToFullnamePipe,
    private route: ActivatedRoute,
    private router: Router,
    private timesheetService: TimesheetService,
    private dateTimeService: DateTimeService,
    private userService: UsersService,
    private _bottomSheet: MatBottomSheet) { 
      super();
      this.configureMainNav(this.getYearFromQuery());  
    }

  ngOnInit() {
    this.timesheetService.addGroupBy(GroupByTypes.YearAndUserName);
    this.initalizeObservables();
  }

  private openWeekFilter = () => {
    let ref = this._bottomSheet.open(WeekListFilterSheetWrapperComponent, {
      data: {year: this.getYearFromQuery()}
    });

    ref.afterDismissed()
      .pipe(filter(f => f != undefined))
      .subscribe(f => this.updateYear(f.year));
  }

  private updateYear = (year: number) => this.router.navigate(['timeadministrering'], { queryParams: {year}})

  private getYearFromQuery(): number{
    return +this.route.snapshot.queryParams['year'] || this.today.getFullYear();
  }

  private configureMainNav(year: number){
    let cfg = this.mainNavService.getDefaultConfig();
    cfg.title = "Administrer timer";
    cfg.subTitle = year.toString();
    cfg.buttons = [{icon: 'filter_list', colorClass: 'color-accent', callback: this.openWeekFilter} as AppButton];
    this.mainNavService.addConfig(cfg);
  }

  private initalizeObservables(){
    this.route.queryParams
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(qp =>{    
      let year = +qp['year'] || this.today.getFullYear();
      let date = new Date();
      date.setFullYear(year);
      console.log(date);
      this.timesheetService.addFilter({dateRange: this.dateTimeService.getYearRange(date)});
      this.configureMainNav(year);
    }); 

    this.userSummaries$ = combineLatest(this.userService.getAll$(), this.timesheetService.timesheetSummaries$)
    .pipe(
      map(([users, summaries]) => { 
      return summaries.map(summary => {
        summary.fullName = this.userNameToFullNamePipe.transform(summary.userName, users);
        return summary;
      })})
    )
  }
}
