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
  map
} from "rxjs/operators";
import { TimesheetStatus } from "src/app/shared/enums";
import { DateParams } from "src/app/shared/interfaces";
import { MatDialog } from "@angular/material/dialog";
import { TimesheetFormDialogWrapperComponent } from "../components/timesheet-form-dialog-wrapper.component";
import { Router } from "@angular/router";
import { TimesheetCardDialogWrapperComponent } from '../components/timesheet-card-dialog-wrapper.component';

@Component({
  selector: "app-timesheet-week-list",
  templateUrl: "./timesheet-week-list.component.html",
  styleUrls: ["./timesheet-week-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetWeekListComponent extends SubscriptionComponent {

  date = new Date();
  userName: string;

  dateParamsSubject: BehaviorSubject<DateParams>;
  dateParams$: Observable<DateParams>;

  timesheetDays$: Observable<Timesheet[][]>;

  vm$: Observable<any>;

  //timesheetDays: Timesheet[][];

  totalWeeks: number;

  constructor(
    private mainNavService: MainNavService,
    private router: Router,
    private dialog: MatDialog,
    private identityService: IdentityService,
    private dateTimeService: DateTimeService,
    private userTimesheetService: UserTimesheetService
  ) {
    super();
    console.time("init");
    this.configureMainNav();
  }

  ngOnInit() { 
    this.initalizeObservables();
    this.userName = this.identityService.getCurrentUser().userName;  
  }

  ngAfterViewInit(): void {
    console.timeEnd("init");
  }

  confirmWeek(days: Timesheet[][]) {
    let ids = [].concat(...days).reduce((acc, timesheet) => {
      if (timesheet.status === TimesheetStatus.Open) acc.push(timesheet.id);
      return acc;
    }, []);
    this.userTimesheetService
      .changeStatuses$(ids, TimesheetStatus.Confirmed)
      .subscribe();
  }

  changeDateParams(dateParams: DateParams) {
    this.dateParamsSubject.next(dateParams);
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

  private goToTimesheetList = () => {
      this.router.navigate([
        "timer/liste",
        {
          returnRoute: this.router.url,
          dateRange: JSON.stringify(
            this.dateTimeService.getWeekRangeByDateParams(this.dateParamsSubject.value)
          )
        }
      ]);
  };

  private initalizeObservables() {
    this.dateParamsSubject = new BehaviorSubject<DateParams>({
      year: this.date.getFullYear(),
      weekNr: this.dateTimeService.getWeekOfYear(this.date)
    });

    this.vm$ = this.dateParamsSubject.asObservable().pipe(
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

  private configureMainNav(){
    let cfg = this.mainNavService.getDefaultConfig();
    cfg.title = "Timevisning";
    cfg.buttons = [{icon: "list", color: "primary", callback: this.goToTimesheetList}];
    this.mainNavService.addConfig(cfg);
  }
}
