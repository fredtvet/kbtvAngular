import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from 'rxjs';
import { map, takeUntil, tap } from "rxjs/operators";
import { DateTimeService,DeviceInfoService } from "src/app/core/services";
import { MainNavService, TopDefaultNavConfig } from 'src/app/layout';
import { GroupByPeriod } from 'src/app/shared-app/enums';
import { DateParams } from "src/app/shared-app/interfaces";
import { TimesheetSummary } from 'src/app/shared-timesheet/interfaces';
import { SubscriptionComponent } from 'src/app/shared-app/components/subscription.component';
import { UserTimesheetCardDialogWrapperComponent } from '../user-timesheet-card-dialog-wrapper.component';
import { UserTimesheetListStore } from '../user-timesheet-list.store';
import { Timesheet } from 'src/app/core/models';
import { WeekCriteria } from 'src/app/shared-timesheet/components/week-filter-view/week-filter-view-config.interface';
import { TimesheetForm } from '../../user-timesheet-form/user-timesheet-form-view/timesheet-form.interface';

@Component({
  selector: "app-user-timesheet-week-view",
  templateUrl: "./user-timesheet-week-view.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTimesheetWeekViewComponent extends SubscriptionComponent {

  currentWeekNr: number = this.dateTimeService.getWeekOfYear();
  currentYear: number = new Date().getFullYear();

  get weekCriteria(): WeekCriteria { return this.store.weekCriteria};

  isXs$ = this.deviceInfoService.isXs$;

  summaries$: Observable<{ [key: number]: TimesheetSummary }> = this.store.timesheetSummaries$.pipe(
    tap(x => this.configureMainNav(this.weekCriteria)),
    map(x => this.dateTimeService.mapObjectsToWeekdays(x, "date"))
  );

  constructor(
    private mainNavService: MainNavService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private deviceInfoService: DeviceInfoService,
    private dateTimeService: DateTimeService,
    private store: UserTimesheetListStore,
  ) { super(); }

  ngOnInit() {
    this.store.addGroupBy(GroupByPeriod.Day) 
    let initFilter = this.route.snapshot.params.initialFilter;
    initFilter = initFilter ? JSON.parse(initFilter) : {year: this.currentYear, weekNr: this.currentWeekNr};
    this.store.addWeekFilterCriteria(initFilter);
    this.store.criteria$.pipe(takeUntil(this.unsubscribe)).subscribe(x => this.configureMainNav(this.weekCriteria))
  }

  nextWeek(): void{
    let currFilter = this.weekCriteria;
    if(currFilter.year >= this.currentYear && currFilter.weekNr >= this.currentWeekNr) return;

    if(currFilter.weekNr >= this.dateTimeService.getWeeksInYear(currFilter.year)){   
      currFilter.year++; //New year if week nr is over total weeks for year
      currFilter.weekNr = 1; //Start of new year     
    }
    else currFilter.weekNr++;

    this.store.addWeekFilterCriteria(currFilter);
  }

  previousWeek(): void{
    let currFilter = this.weekCriteria;
    if(currFilter.weekNr <= 1) {
      currFilter.year--; //Go to previous year if new week is less than 1
      currFilter.weekNr = this.dateTimeService.getWeeksInYear(currFilter.year); //Set to max week in previous year
    }
    else currFilter.weekNr--;  
    this.store.addWeekFilterCriteria(currFilter);
  }
  
  openTimesheetForm = (entityId?: string, lockedValues?: TimesheetForm) => 
    this.router.navigate(['skjema', {config: JSON.stringify({formConfig: {entityId, viewConfig: {lockedValues}}})}], {relativeTo: this.route});

  openTimesheetCard = (timesheetId: string) =>
    this.dialog.open(UserTimesheetCardDialogWrapperComponent, {
      data: timesheetId, panelClass: 'extended-dialog'});

  trackByTimesheet = (index: number, timesheet: Timesheet) => timesheet.id

  private goToTimesheetList = () => {
      const dp = this.weekCriteria;
      this.router.navigate([
        "mine-timer/liste",
        {
          returnUrl: this.router.url,
          initialFilter: JSON.stringify({dateRange: this.dateTimeService.getWeekRangeByDateParams(dp)})
        }
      ]);
  };

  private goToWeekList = () => 
    this.router.navigate(['mine-timer/ukeliste', {initialFilter: JSON.stringify({year: this.weekCriteria.year})}])

  private configureMainNav(dp: DateParams){
    let cfg = {
      title:  "Uke " + dp?.weekNr || "",
      subTitle: dp?.year?.toString() || "",
      backFn: this.goToWeekList,
      buttons: [{icon: "list", callback: this.goToTimesheetList}]
    } as TopDefaultNavConfig;
    
    this.mainNavService.addConfig({default: cfg});
  }
}
