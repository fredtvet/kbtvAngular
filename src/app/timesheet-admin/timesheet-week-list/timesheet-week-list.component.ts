import { Component, OnInit } from '@angular/core';
import { TimesheetSummary, TimesheetFilter, AppButton } from 'src/app/shared/interfaces';
import { Observable, combineLatest } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MainNavService, TimesheetService, UsersService, DateTimeService } from 'src/app/core/services';
import { UsernameToFullnamePipe } from 'src/app/shared/pipes';
import { map, tap, skip, takeUntil, filter } from 'rxjs/operators';
import { GroupByTypes } from 'src/app/shared/enums';
import { SubscriptionComponent } from 'src/app/shared/components/abstracts/subscription.component';
import { WeekListFilterSheetWrapperComponent } from 'src/app/shared/components';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-timesheet-week-list',
  templateUrl: './timesheet-week-list.component.html'
})
export class TimesheetWeekListComponent extends SubscriptionComponent {
  
  today = new Date();
  weekSummaries$: Observable<TimesheetSummary[]>;

  constructor(
    private dateTimeService: DateTimeService,
    private timesheetService: TimesheetService,
    private userService: UsersService,
    private mainNavService: MainNavService, 
    private userNameToFullNamePipe: UsernameToFullnamePipe,
    private route: ActivatedRoute,
    private _bottomSheet: MatBottomSheet,
    private router: Router) 
    {     
      super();  
      this.configureMainNav();
    }

  ngOnInit() {   
    this.timesheetService.addGroupBy(GroupByTypes.Week);
    this.initalizeObservables();
  }


  
  private getFilterFromParams(params: Params): TimesheetFilter {
    let date = new Date();
    date.setFullYear(+params['year'] || this.today.getFullYear());
    return {
      dateRange: this.dateTimeService.getYearRange(date),
      userName: params['userName']
    }
  }

  private openWeekFilter = () => {
    let ref = this._bottomSheet.open(WeekListFilterSheetWrapperComponent, {
      data: {
        year: +this.route.snapshot.queryParams['year'] || this.today.getFullYear(), 
        userName: this.route.snapshot.queryParams['userName']
      }});

    ref.afterDismissed()
      .pipe(filter(f => f != undefined))
      .subscribe(f => this.updateFilter(f));
  }

  private updateFilter = (filter: {year: number, userName: string}) => 
    this.router.navigate(['timeadministrering','ukeliste'], {queryParams: {year: filter.year, userName: filter.userName}});

  private onBack = () => 
    this.router.navigate(['timeadministrering'], { queryParams: {year: +this.route.snapshot.queryParams['year'] || this.today.getFullYear()}})

  private initalizeObservables(){
    this.route.queryParams
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(qp =>   this.timesheetService.addFilter(this.getFilterFromParams(qp))); 
    
    this.weekSummaries$ = combineLatest(this.userService.getAll$(), this.timesheetService.timesheetSummaries$)
    .pipe(
      map(([users, summaries]) => { 
      return summaries.map(summary => {
        summary.fullName = this.userNameToFullNamePipe.transform(summary.userName, users);
        return summary;
      })}),
      tap(x => this.addNameToMainNav(this.route.snapshot.queryParams['userName'] && x[0] ? x[0].fullName : ''))
    );
  }

  private configureMainNav(){
    let cfg = this.mainNavService.getDefaultConfig();
    cfg.title = "Uker";
    cfg.menuBtnEnabled = false;
    cfg.backFn = this.onBack;
    cfg.buttons = [{icon: 'filter_list', colorClass: 'color-accent', callback: this.openWeekFilter} as AppButton];
    //cfg.buttons = [{icon: "list", callback: this.goToTimesheetList}];
    this.mainNavService.addConfig(cfg);
  }

  private addNameToMainNav(name:string){
      if(name == undefined) return null;
      let cfg = this.mainNavService.getCurrentConfig();
      cfg.subTitle = name;
      this.mainNavService.addConfig(cfg);
  }
}
