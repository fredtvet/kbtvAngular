import { Component, ViewChild, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { MainNavService, TimesheetService, DateTimeService, TimesheetAggregatorService, LoadingService } from 'src/app/core/services';
import { TimesheetSummary } from 'src/app/shared/interfaces';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { WeekListFilterSheetWrapperComponent } from '../../shared/components/week-list-filter/week-list-filter-sheet-wrapper.component';
import { filter, map, startWith, pairwise, tap, distinctUntilKeyChanged, distinct, takeUntil} from 'rxjs/operators';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { GroupByTypes, TimesheetStatus } from 'src/app/shared/enums';
import { Timesheet } from 'src/app/shared/models';
import { listAnimation } from 'src/app/shared/animations/list.animation';
import { SubscriptionComponent } from 'src/app/shared/components/abstracts/subscription.component';

@Component({
  selector: 'app-timesheet-admin-list',
  templateUrl: './timesheet-admin-list.component.html',
  animations: [listAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TimesheetAdminListComponent extends SubscriptionComponent{

  @ViewChild('yearList', {static:false}) 
  private yearList: TemplateRef<any>;

  @ViewChild('weekList', {static:false}) 
  private weekList: TemplateRef<any>;

  @ViewChild('timesheetList', {static:false}) 
  private timesheetList: TemplateRef<any>;

  activeView$: Observable<{view: TemplateRef<any>, context: any[]}>;
    
  loading$ = this._loadingService.loading$;

  constructor(
    private _loadingService: LoadingService,
    private timesheetService: TimesheetService,
    private mainNavService: MainNavService,
    private route: ActivatedRoute,
    private router: Router,
    private dateTimeService: DateTimeService,
    private _bottomSheet: MatBottomSheet) { 
      super();
      this.timesheetService.addGroupBy(GroupByTypes.Week);
      this.configureWeekListNav();
      this.initalizeObservable();
    }

  get selectedYear() {return +this.route.snapshot.params['year']};
  get selectedUserName() {return this.route.snapshot.params['userName']};

  updateUri = (year?: number, userName?: string): void => {
    if(!year && !userName) this.router.navigate(['timeadministrering']);
    else this.router.navigate(['timeadministrering', userName || this.selectedUserName, year || this.selectedYear])
  }

  selectWeek = (week: number) => 
    this.router.navigate([], {relativeTo: this.route, queryParams: {week}, queryParamsHandling: 'merge'})
  

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
    this.route.params.pipe(takeUntil(this.unsubscribe))
      .subscribe(x => this.loadWeekSummaries(x.year, x.userName));
 
    this.activeView$ = combineLatest(
      this.timesheetService.timesheetSummaries$, 
      this.route.queryParams
    ).pipe(
        filter(([summaries, params]) => summaries && summaries.length > 0),
        map(([summaries, params]) => {     
        //If initial load or year changes
        let result: {view: TemplateRef<any>, context: any[]} = {view: null, context: null};

        if(params.week){         
          result.context = summaries.find(x => x.week == params.week).timesheets;
          result.view = this.timesheetList;
          this.configureTimesheetListNav(params.week)
        } 
        else{      
          result.context = summaries.sort((a, b) => b.week - a.week);
          result.view = this.weekList;
          this.configureWeekListNav()
        } 

        return result;
      })
    );
  }

  private loadWeekSummaries = (year: number, userName: string): void => {
    let date = new Date();
    date.setFullYear(year);  
    this.timesheetService.addFilter({dateRange: this.dateTimeService.getYearRange(date), userName});
  }

  private openWeekFilter = () => {
    let ref = this._bottomSheet.open(WeekListFilterSheetWrapperComponent, {
      data: {year: this.selectedYear, userName: this.selectedUserName}
    });

    ref.afterDismissed()
      .pipe(filter(f => f != undefined))
      .subscribe(f => this.updateUri(f.year, f.userName));
  }

  private configureWeekListNav(){
    let cfg = this.mainNavService.getDefaultConfig();
    cfg.title = "Uker";
    cfg.subTitle = this.selectedYear + ' - ' + this.selectedUserName;
    cfg.backFn = this.updateUri;
    cfg.buttons = [{icon: 'filter_list', colorClass: 'color-accent', callback: this.openWeekFilter}];
    this.mainNavService.addConfig(cfg);
  }

  private configureTimesheetListNav(week: number){
    let cfg = this.mainNavService.getDefaultConfig();
    cfg.title = "Uke " + week;
    cfg.subTitle = this.selectedYear + ' - ' + this.selectedUserName;
    cfg.backFn = this.selectWeek;
    cfg.backFnParams = [null];   
    cfg.buttons = [{icon: 'filter_list', colorClass: 'color-accent', callback: this.openWeekFilter}];
    this.mainNavService.addConfig(cfg);
  }
  
  trackByWeek = (index:number, summary:TimesheetSummary): number => summary.week;

  trackById = (index:number, timesheet:Timesheet): number => timesheet.id;
}
