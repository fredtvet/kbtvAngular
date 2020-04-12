import { Component, ChangeDetectionStrategy } from "@angular/core";
import {
  IdentityService,
  UserTimesheetService,
  DateTimeService
} from "src/app/core/services";
import { Timesheet } from "src/app/shared/models";
import { BehaviorSubject, Observable } from "rxjs";
import { SubscriptionComponent } from "src/app/shared/components/abstracts/subscription.component";
import {
  takeUntil,
  switchMap,
  distinctUntilChanged,
  take,
  tap,
  shareReplay,
  map
} from "rxjs/operators";
import { TimesheetStatus, DateRangePresets } from "src/app/shared/enums";
import { DateParams } from "src/app/shared/interfaces";
import { MatDialog } from "@angular/material/dialog";
import { TimesheetFormDialogWrapperComponent } from "../components/timesheet-form-dialog-wrapper.component";
import { MainNavConfig } from "src/app/shared/layout";
import { Router } from "@angular/router";

@Component({
  selector: "app-timesheet-week-list",
  templateUrl: "./timesheet-week-list.component.html",
  styleUrls: ["./timesheet-week-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetWeekListComponent extends SubscriptionComponent {
  mainNavConfig = new MainNavConfig();
  date = new Date();
  userName: string;

  dateParamsSubject: BehaviorSubject<DateParams>;
  dateParams$: Observable<DateParams>;

  timesheetDays$: Observable<Timesheet[][]>;

  vm$: Observable<any>;

  //timesheetDays: Timesheet[][];

  totalWeeks: number;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private identityService: IdentityService,
    private dateTimeService: DateTimeService,
    private userTimesheetService: UserTimesheetService
  ) {
    super();
    this.initalizeObservables();
    this.userName = this.identityService.getCurrentUser().userName;
    console.time("init");
  }

  ngOnInit() {
    this.mainNavConfig.iconAction = { icon: "list", color: "primary" };
    //this.timesheetDays$.subscribe(x => (this.timesheetDays = x));
  }

  ngAfterViewInit(): void {
    console.timeEnd("init");
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }

  dateParamsWithWeekday(weekDay: number): DateParams {
    return { ...this.dateParamsSubject.value, weekDay: weekDay };
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
    this.dialog.open(TimesheetFormDialogWrapperComponent, {
      data: { date: date }
    });
  }

  goToTimesheetList = (e: string) => {
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
}
