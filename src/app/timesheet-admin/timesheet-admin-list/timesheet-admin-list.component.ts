import { Component, ViewChild, TemplateRef } from '@angular/core';
import { MainNavService, TimesheetService, DateTimeService, TimesheetAggregatorService } from 'src/app/core/services';
import { TimesheetSummary } from 'src/app/shared/interfaces';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { WeekListFilterSheetWrapperComponent } from '../../shared/components/week-list-filter/week-list-filter-sheet-wrapper.component';
import { filter, map, startWith, pairwise} from 'rxjs/operators';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { SubscriptionComponent } from 'src/app/shared/components/abstracts/subscription.component';
import { GroupByTypes, TimesheetStatus } from 'src/app/shared/enums';
import { Timesheet } from 'src/app/shared/models';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-timesheet-admin-list',
  templateUrl: './timesheet-admin-list.component.html'
})
export class TimesheetAdminListComponent extends SubscriptionComponent {

  @ViewChild('yearList', {static:false}) 
  private yearList: TemplateRef<any>;

  @ViewChild('weekList', {static:false}) 
  private weekList: TemplateRef<any>;

  @ViewChild('timesheetList', {static:false}) 
  private timesheetList: TemplateRef<any>;

  activeView$: Observable<{view: TemplateRef<any>, context: any[]}>;

  today = new Date();
    
  constructor(
    private timesheetAggregator: TimesheetAggregatorService,
    private timesheetService: TimesheetService,
    private mainNavService: MainNavService,
    private route: ActivatedRoute,
    private router: Router,
    private dateTimeService: DateTimeService,
    private _bottomSheet: MatBottomSheet) { 
      super();
      this.timesheetService.addGroupBy(GroupByTypes.YearAndUserName);
      this.configureDefaultNav(+this.route.snapshot.queryParams['year'] || this.today.getFullYear());
      this.initalizeObservable();
    }

  updateQuery = (queryParams: Params): void => {
    this.router.navigate(['timeadministrering'], {queryParams, queryParamsHandling: 'merge'})
  }

  changeTimesheetStatus = (id: number, status: TimesheetStatus): void => {
    this.timesheetService.changeStatus$(id, status).subscribe();
  }
  
  confirmTimesheets = (timesheets: Timesheet[]): void => {
    if(!timesheets) return undefined;
    let ids = timesheets.reduce((_ids, timesheet) => {
      if(timesheet.status == 0) _ids.push(timesheet.id);
      return _ids
    }, []);
    if(ids.length == 0) return undefined;

    this.timesheetService.changeStatuses$(ids, TimesheetStatus.Confirmed).subscribe();
  }

  private initalizeObservable(){
    this.activeView$ = combineLatest(this.timesheetService.timesheetSummaries$,this.route.queryParams.pipe(startWith(null),pairwise()))
      .pipe(
        map(([summaries, [prev, curr]]) => {     
        let params = {year: curr['year'] || this.today.getFullYear(), userName: curr['userName'], week: curr['week']};
        //If initial load or year changes
        if(prev == null || prev['year'] !== params.year) this.loadYearSummaries(params.year);
        
        let result: {view: TemplateRef<any>, context: any[]} = {view: null, context: null};

        if(params.userName && !params.week){
          result.context = this.filterSummaryForUser(params.userName, summaries);
          result.view = this.weekList;
          this.configureWeekListNav(params.year, params.userName)
        } 
        else if(params.userName && params.week){
          result.context = this.filterTimesheetsForUserWeek(params.year, params.userName, params.week, summaries);
          result.view = this.timesheetList;
          this.configureTimesheetListNav(params.year, params.userName,params.week)
        } 
        else{
          result = {view: this.yearList, context: summaries};
          this.configureDefaultNav(params.year);
        }
        return result;
      })
    );
  }

  private loadYearSummaries = (year: number): void => {
    let date = new Date();
    date.setFullYear(year);  
    this.timesheetService.addFilter({dateRange: this.dateTimeService.getYearRange(date)});
  }

  private filterSummaryForUser = (userName: string, initialSummaries: TimesheetSummary[]): TimesheetSummary[] => {
    let summary = initialSummaries.find(x => x.userName == userName);
    if(!summary) return undefined;
    return this.timesheetAggregator.groupByWeek(summary.timesheets).sort((a, b) => b.week - a.week);
  }

  private filterTimesheetsForUserWeek = (year: number, userName: string, weekNr: number, initialSummaries: TimesheetSummary[]): Timesheet[] => {
    let weekRange = this.dateTimeService.getWeekRangeByDateParams({year, weekNr});
    let userSummary = initialSummaries.find(x => x.userName == userName);
    if(!userSummary || !userSummary.timesheets) return undefined;

    return userSummary.timesheets.filter(t => {
      let date = new Date(t.startTime);
      return date >= weekRange[0] && date <= weekRange[1];
    })
  }

  private openWeekFilter = () => {
    let ref = this._bottomSheet.open(WeekListFilterSheetWrapperComponent, {
      data: {year: +this.route.snapshot.queryParams['year'] || this.today.getFullYear()}
    });

    ref.afterDismissed()
      .pipe(filter(f => f != undefined))
      .subscribe(f => this.updateQuery({year: f.year}));
  }

  private configureDefaultNav(year: number){
    let cfg = this.mainNavService.getDefaultConfig();
    cfg.title = "Administrer timer";
    cfg.subTitle = year.toString();
    cfg.buttons = [{icon: 'filter_list', colorClass: 'color-accent', callback: this.openWeekFilter}];
    this.mainNavService.addConfig(cfg);
  }

  private configureWeekListNav(year: number, userName: string){
    let cfg = this.mainNavService.getDefaultConfig();
    cfg.title = "Uker";
    cfg.subTitle = year + ' - ' + userName;
    cfg.backFn = this.updateQuery;
    cfg.backFnParams = [{userName: null, week: null}];
    //cfg.buttons = [{icon: "list", callback: this.goToTimesheetList}];
    this.mainNavService.addConfig(cfg);
  }

  private configureTimesheetListNav(year: number, userName: string, week: number){
    let cfg = this.mainNavService.getDefaultConfig();
    cfg.title = "Uke " + week;
    cfg.subTitle = year + ' - ' + userName;
    cfg.backFn = this.updateQuery;
    cfg.backFnParams = [{week: null}];
    //cfg.buttons = [{icon: "list", callback: this.goToTimesheetList}];
    this.mainNavService.addConfig(cfg);
  }

  trackByFn(index:number, summary:TimesheetSummary): string {
    return summary.year + '-' + summary.week;
  }

}
