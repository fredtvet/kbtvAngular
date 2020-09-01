import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from 'rxjs';
import { map, takeUntil, tap } from "rxjs/operators";
import { DateTimeService,DeviceInfoService } from "src/app/core/services";
import { MainNavService, TopDefaultNavConfig } from 'src/app/layout';
import { GroupByPeriod } from 'src/app/shared-app/enums';
import { DateParams } from "src/app/shared-app/interfaces";
import { WeekFilterCriteria } from 'src/app/shared-timesheet/components/week-filter/week-filter-config.interface';
import { TimesheetFormConfig } from 'src/app/shared-timesheet/interfaces';
import { SubscriptionComponent } from 'src/app/shared-app/components/subscription.component';
import { UserTimesheetCardDialogWrapperComponent } from '../user-timesheet-card-dialog-wrapper.component';
import { UserTimesheetListStore } from '../user-timesheet-list.store';
import { TimesheetSummary } from 'src/app/shared/interfaces';
import { Timesheet } from 'src/app/core/models';

@Component({
  selector: "app-user-timesheet-week-view",
  templateUrl: "./user-timesheet-week-view.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTimesheetWeekViewComponent extends SubscriptionComponent {

  currentWeekNr: number = this.dateTimeService.getWeekOfYear();
  currentYear: number = new Date().getFullYear();

  get weekFilter(): WeekFilterCriteria { return this.store.weekFilter};

  isXs$ = this.deviceInfoService.isXs$;

  summaries$: Observable<{ [key: number]: TimesheetSummary }> = this.store.timesheetSummaries$.pipe(
    tap(x => this.configureMainNav(this.weekFilter)),
    map(x => this.mapSummariesToWeekdays(x)), tap(console.log)
  );

  constructor(
    private mainNavService: MainNavService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private deviceInfoService: DeviceInfoService,
    private dateTimeService: DateTimeService,
    private store: UserTimesheetListStore,
  ) { super(); this.store.addGroupBy(GroupByPeriod.Day) }

  ngOnInit() {
    let initFilter = this.route.snapshot.params.initialFilter;
    initFilter = initFilter ? JSON.parse(initFilter) : {year: this.currentYear, weekNr: this.currentWeekNr};
    this.store.addWeekFilter(initFilter);
    this.configureMainNav(initFilter);
    this.store.criteria$.pipe(takeUntil(this.unsubscribe)).subscribe(x => this.configureMainNav(this.weekFilter))
  }

  nextWeek(): void{
    let currFilter = this.weekFilter;
    if(currFilter.year >= this.currentYear && currFilter.weekNr >= this.currentWeekNr) return;

    if(currFilter.weekNr >= this.dateTimeService.getWeeksInYear(currFilter.year)){   
      currFilter.year++; //New year if week nr is over total weeks for year
      currFilter.weekNr = 1; //Start of new year     
    }
    else currFilter.weekNr++;

    this.store.addWeekFilter(currFilter);
  }

  previousWeek(): void{
    let currFilter = this.weekFilter;
    if(currFilter.weekNr <= 1) {
      currFilter.year--; //Go to previous year if new week is less than 1
      currFilter.weekNr = this.dateTimeService.getWeeksInYear(currFilter.year); //Set to max week in previous year
    }
    else currFilter.weekNr--;  
    this.store.addWeekFilter(currFilter);
  }

  openTimesheetForm = (config: TimesheetFormConfig) => 
    this.router.navigate(['skjema', {config: JSON.stringify(config)}], {relativeTo: this.route});

  openTimesheetCard = (timesheetId: number) =>
    this.dialog.open(UserTimesheetCardDialogWrapperComponent, {
      data: timesheetId, panelClass: 'extended-dialog'});

  trackByTimesheet = (index: number, timesheet: Timesheet) => 
    timesheet.totalHours && new Date(timesheet.startTime).getTime()

  private goToTimesheetList = () => {
      const dp = this.weekFilter;
      this.router.navigate([
        "mine-timer/liste",
        {
          returnUrl: this.router.url,
          initialFilter: JSON.stringify({dateRange: this.dateTimeService.getWeekRangeByDateParams(dp)})
        }
      ]);
  };

  private goToWeekList = () => 
    this.router.navigate(['mine-timer/ukeliste', {initialFilter: JSON.stringify({year: this.weekFilter.year})}])

  private configureMainNav(dp: DateParams){
    let cfg = {
      title:  "Uke " + dp?.weekNr || "",
      subTitle: dp?.year?.toString() || "",
      backFn: this.goToWeekList,
      buttons: [{icon: "list", callback: this.goToTimesheetList}]
    } as TopDefaultNavConfig;
    
    this.mainNavService.addConfig({default: cfg});
  }

  private mapSummariesToWeekdays(summaries: TimesheetSummary[]): { [key: number]: TimesheetSummary }{
    return  summaries.reduce((obj, summary) => { 
      obj[new Date(summary.date).getDay() || 7] = summary;
      return obj;
    },{});
  }
}
