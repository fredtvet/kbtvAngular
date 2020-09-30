import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { DeviceInfoService } from 'src/app/core/services/device-info.service';
import { _getDateOfWeek } from 'src/app/shared-app/helpers/datetime/get-date-of-week.helper';
import { _getWeekOfYear } from 'src/app/shared-app/helpers/datetime/get-week-of-year.helper';
import { _getWeekRange } from 'src/app/shared-app/helpers/datetime/get-week-range.helper';
import { _getWeeksInYear } from 'src/app/shared-app/helpers/datetime/get-weeks-in-year.helper';
import { _mapObjectsToWeekdays } from 'src/app/shared-app/helpers/object/map-objects-to-weekdays.helper';
import { WeekCriteria } from 'src/app/shared-timesheet/components/week-filter-view/week-filter-view-config.interface';
import { TimesheetSummary } from 'src/app/shared-timesheet/interfaces';
import { GroupByPeriod } from 'src/app/shared/enums';
import { ViewModel } from 'src/app/shared/interfaces/view-model.interface';
import { TrackByModel } from 'src/app/shared/trackby/track-by-model.helper';
import { TimesheetForm } from '../../user-timesheet-form/user-timesheet-form-view/timesheet-form.interface';
import { UserTimesheetCardDialogWrapperComponent } from '../user-timesheet-card-dialog-wrapper.component';
import { UserTimesheetListStore } from '../user-timesheet-list.store';

@Component({
  selector: "app-user-timesheet-week-view",
  templateUrl: "./user-timesheet-week-view.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTimesheetWeekViewComponent {

  currentWeekNr: number = _getWeekOfYear();
  currentYear: number = new Date().getFullYear();

  get weekCriteria(): WeekCriteria { return this.store.weekCriteria };

  isXs$ = this.deviceInfoService.isXs$;

  vm$: Observable<ViewModel<{ [key: number]: TimesheetSummary }>> = this.store.timesheetSummaries$.pipe(
    map(x => { return {
      navConfig: this.getNavConfig(),
      content: _mapObjectsToWeekdays(x, "date")
    }}),
  );

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private deviceInfoService: DeviceInfoService,
    private store: UserTimesheetListStore,
  ) { }

  ngOnInit() {
    this.store.addGroupBy(GroupByPeriod.Day) 
    let initFilter = this.route.snapshot.params.initialFilter;
    initFilter = initFilter ? JSON.parse(initFilter) : {year: this.currentYear, weekNr: this.currentWeekNr};
    this.store.addWeekFilterCriteria(initFilter);
  }

  nextWeek(): void{
    let currFilter = this.weekCriteria;
    if(currFilter.year >= this.currentYear && currFilter.weekNr >= this.currentWeekNr) return;

    if(currFilter.weekNr >= _getWeeksInYear(currFilter.year)){   
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
      currFilter.weekNr = _getWeeksInYear(currFilter.year); //Set to max week in previous year
    }
    else currFilter.weekNr--;  
    this.store.addWeekFilterCriteria(currFilter);
  }
  
  openTimesheetForm = (entityId?: string, lockedValues?: TimesheetForm) => 
    this.router.navigate(['skjema', {config: JSON.stringify({formConfig: {entityId, viewConfig: {lockedValues}}})}], {relativeTo: this.route});

  openTimesheetCard = (timesheetId: string) =>
    this.dialog.open(UserTimesheetCardDialogWrapperComponent, {
      data: timesheetId, panelClass: 'extended-dialog'});

  trackByTimesheet = TrackByModel("timesheets");

  private goToTimesheetList = () => {
      const dp = this.weekCriteria;
      this.router.navigate([
        "mine-timer/liste",
        {
          returnUrl: this.router.url,
          initialFilter: JSON.stringify({
            dateRange: _getWeekRange(_getDateOfWeek(dp.weekNr, dp.year))
          })
        }
      ]);
  };

  private goToWeekList = () => 
    this.router.navigate(['mine-timer/ukeliste', {initialFilter: JSON.stringify({year: this.weekCriteria?.year})}])

  private getNavConfig(){
    return {
      title:  "Uke " + this.weekCriteria?.weekNr || "",
      subTitle: this.weekCriteria?.year?.toString() || "",
      backFn: this.goToWeekList,
      buttons: [{icon: "list", callback: this.goToTimesheetList}]
    }
  }
}
