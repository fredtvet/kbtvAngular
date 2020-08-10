import { Component, ChangeDetectionStrategy } from "@angular/core";
import {
  UserTimesheetService,
  DateTimeService,
  MainNavService,
  DeviceInfoService
} from "src/app/core/services";
import { switchMap, map } from "rxjs/operators";
import { DateParams, TopDefaultNavConfig } from "src/app/shared-app/interfaces";
import { MatDialog } from "@angular/material/dialog";
import { Router, ActivatedRoute } from "@angular/router";
import { TimesheetCardDialogWrapperComponent } from '../components/timesheet-card-dialog-wrapper.component';
import { Observable } from 'rxjs';

@Component({
  selector: "app-timesheet-week-view",
  templateUrl: "./timesheet-week-view.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetWeekViewComponent {

  date = new Date();

  currentWeekNr: number = this.dateTimeService.getWeekOfYear(this.date);
  currentYear: number = this.date.getFullYear();

  vm$: Observable<any>;
  isXs$: Observable<boolean> = this.deviceInfoService.isXs$;

  constructor(
    private mainNavService: MainNavService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private deviceInfoService: DeviceInfoService,
    private dateTimeService: DateTimeService,
    private userTimesheetService: UserTimesheetService
  ) {
    this.configureMainNav(this.getDateParams(this.route.snapshot.queryParams));
  }

  ngOnInit() {this.initalizeObservable();}

  nextWeek(dp: DateParams): void{
    if(dp.year == this.currentYear && dp.weekNr < this.currentWeekNr){ //Only allow up to current week if this year
      dp.weekNr++;
    }
    else if(dp.year != this.currentYear){
      if(dp.weekNr >= this.dateTimeService.getWeeksInYear(dp.year)){
        dp.year++; //New year if week nr is over total weeks for year
        dp.weekNr = 1; //Start of new year
      }
      else dp.weekNr++;
    }
    this.changeDateParams(dp);
  }

  previousWeek(dp: DateParams): void{
    if(dp.weekNr <= 1) {
      dp.year--; //Go to previous year if new week is less than 1
      dp.weekNr = this.dateTimeService.getWeeksInYear(dp.year); //Set to max week in previous year
    }
    else dp.weekNr--;
    this.changeDateParams(dp);
  }

  openTimesheetForm = (datePreset?: Date, idPreset?: number) => 
    this.router.navigate(['skjema'], {relativeTo: this.route, queryParamsHandling: "merge", queryParams: {
      idPreset, datePreset: datePreset ? datePreset.toString() : undefined}});

  openTimesheetCard(timesheetId: number){
    this.dialog.open(TimesheetCardDialogWrapperComponent, {
      data: timesheetId, panelClass: 'extended-dialog'});
  }

  private goToTimesheetList = () => {
      const dp = this.getDateParams(this.route.snapshot.queryParams)
      this.router.navigate([
        "mine-timer/liste",
        {
          returnRoute: this.router.url,
          dateRange: JSON.stringify(this.dateTimeService.getWeekRangeByDateParams(dp))
        }
      ]);
  };

  private goToWeekList = () => this.router.navigate(['mine-timer/ukeliste'], {queryParams : {year: this.route.snapshot.queryParams['year']}})

  private initalizeObservable() {
    this.vm$ = this.route.queryParams.pipe(
      map(qp => this.getDateParams(qp)),
      switchMap(dp => {
        this.configureMainNav(dp);
        return this.userTimesheetService.getByWeekGrouped$(dp).pipe(
           map(days => { return { days: days, dateParams: dp }}));
      })
    );
  }

  private configureMainNav(dp: DateParams){
    let cfg = {
      title:  "Uke " + dp.weekNr,
      subTitle: dp.year.toString(),
      backFn: this.goToWeekList,
      buttons: [{icon: "list", callback: this.goToTimesheetList}]
    } as TopDefaultNavConfig;
    
    this.mainNavService.addConfig({default: cfg});
  }

  private getDateParams(params): DateParams{
    return {
      year: +params['year'] || this.date.getFullYear(), 
      weekNr: +params['weekNr'] || this.dateTimeService.getWeekOfYear(this.date)
    }
  }

  private changeDateParams = (dp: DateParams) => this.router.navigate(['mine-timer/ukevisning'], {queryParams : {year: dp.year, weekNr: dp.weekNr}})
  

}
