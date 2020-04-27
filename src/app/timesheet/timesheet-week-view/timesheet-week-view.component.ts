import { Component, ChangeDetectionStrategy } from "@angular/core";
import {
  IdentityService,
  UserTimesheetService,
  DateTimeService,
  MainNavService
} from "src/app/core/services";
import { Timesheet } from "src/app/shared/models";
import { BehaviorSubject, Observable } from "rxjs";
import { SubscriptionComponent } from "src/app/shared/components/abstracts/subscription.component";
import {
  takeUntil,
  switchMap,
  map,
  tap
} from "rxjs/operators";
import { TimesheetStatus } from "src/app/shared/enums";
import { DateParams } from "src/app/shared/interfaces";
import { MatDialog } from "@angular/material/dialog";
import { TimesheetFormDialogWrapperComponent } from "../components/timesheet-form-dialog-wrapper.component";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { TimesheetCardDialogWrapperComponent } from '../components/timesheet-card-dialog-wrapper.component';

@Component({
  selector: "app-timesheet-week-view",
  templateUrl: "./timesheet-week-view.component.html",
  styleUrls: ["./timesheet-week-view.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetWeekViewComponent extends SubscriptionComponent {

  date = new Date();

  currentWeekNr: number = this.dateTimeService.getWeekOfYear(this.date);
  currentYear: number = this.date.getFullYear();

  timesheetDays$: Observable<Timesheet[][]>;

  vm$: Observable<any>;

  constructor(
    private mainNavService: MainNavService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private dateTimeService: DateTimeService,
    private userTimesheetService: UserTimesheetService
  ) {
    super();
    this.configureMainNav(this.route.snapshot.paramMap);
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

  openTimesheetForm(date: Date): void {
   const dialogRef = this.dialog.open(TimesheetFormDialogWrapperComponent, {
      data: { date: date }
    });

    dialogRef.afterClosed().subscribe(timesheet => {
      if(timesheet) this.openTimesheetCard(timesheet.id);
    });
  }

  openTimesheetCard(timesheetId: number){
    this.dialog.open(TimesheetCardDialogWrapperComponent, {
      data: timesheetId
    });
  }

  private confirmWeek = (days: Timesheet[][]) => {
    let ids = [].concat(...days).reduce((acc, timesheet) => {
      if (timesheet.status === TimesheetStatus.Open) acc.push(timesheet.id);
      return acc;
    }, []);
    this.userTimesheetService
      .changeStatuses$(ids, TimesheetStatus.Confirmed)
      .subscribe();
  }

  private goToTimesheetList = () => {
      const dp = this.getDateParams(this.route.snapshot.paramMap)
      this.router.navigate([
        "timer/liste",
        {
          returnRoute: this.router.url,
          dateRange: JSON.stringify(this.dateTimeService.getWeekRangeByDateParams(dp))
        }
      ]);
  };

  private goToWeekList = () => this.router.navigate(['timer', this.route.snapshot.paramMap.get('year'), 'ukeliste'])

  private initalizeObservable() {
    this.vm$ = this.route.paramMap.pipe(
      tap(pm => this.configureMainNav(pm)),
      map(pm => this.getDateParams(pm)),
      switchMap(dp => {
        return this.userTimesheetService.getByWeekGrouped$(dp).pipe(
          map(days => {
            return { days: days, dateParams: dp };
          })
        );
      }),
      takeUntil(this.unsubscribe)
    );
  }

  private configureMainNav(pm: ParamMap){
    let cfg = this.mainNavService.getDefaultConfig();
    cfg.title = "Uke " + pm.get('weekNr');
    cfg.subTitle = pm.get('year');
    cfg.menuBtnEnabled = false;
    cfg.backFn = this.goToWeekList;
    cfg.buttons = [{icon: "list", callback: this.goToTimesheetList}];
    this.mainNavService.addConfig(cfg);
  }

  private getDateParams(pm: ParamMap): DateParams{
    return {
      year: +pm.get('year') || this.date.getFullYear(), 
      weekNr: +pm.get('weekNr') || this.dateTimeService.getWeekOfYear(this.date)
    }
  }

  private changeDateParams = (dp: DateParams) => this.router.navigate(['timer', dp.year, dp.weekNr, 'ukevisning'])
  

}
