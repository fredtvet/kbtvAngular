import { Component, OnInit, SimpleChanges, ChangeDetectionStrategy } from "@angular/core";
import { UserTimesheetService, DateTimeService } from "src/app/core/services";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { TimesheetListFilterWrapperComponent } from "./timesheet-list-filter-wrapper.component";
import { MainNavConfig } from "src/app/shared/layout";
import { FixedSizeVirtualScrollStrategy } from "@angular/cdk/scrolling";
import { TimesheetStatus, DateRangePresets } from "src/app/shared/enums";
import { ActivatedRoute, Router } from "@angular/router";
import { TimesheetFormDialogWrapperComponent } from "../components/timesheet-form-dialog-wrapper.component";
import { MatDialog } from "@angular/material/dialog";
import { Mission, TimesheetListFilter, Timesheet } from "src/app/shared/models";
import { BehaviorSubject, Observable } from "rxjs";
import { map, switchMap, tap, filter, distinctUntilChanged, shareReplay } from "rxjs/operators";

@Component({
  selector: "app-timesheet-list",
  templateUrl: "./timesheet-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TimesheetListComponent implements OnInit {
  timesheetStatus = TimesheetStatus;
  scrollStrategy = FixedSizeVirtualScrollStrategy;
  mainNavConfig = new MainNavConfig();

  private filterSubject: BehaviorSubject<TimesheetListFilter>;

  timesheets$: Observable<Timesheet[]>;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private _bottomSheet: MatBottomSheet,
    private userTimesheetService: UserTimesheetService,
    private dateTimeService: DateTimeService
  ) {}

  ngOnInit() {
    this.mainNavConfig.title = "Timeliste";
    this.mainNavConfig.menuBtnEnabled = false;
    //Initiate filter and observable
    this.filterSubject = new BehaviorSubject(this.getInitialFilter());
    this.timesheets$ = this.filterSubject.asObservable().pipe(   
      switchMap(filter => this.userTimesheetService.getBy$(t => filter.checkTimesheet(t)))
    );
  }

  openBottomSheet(): void {
    let ref = this._bottomSheet.open(TimesheetListFilterWrapperComponent, {
      data: this.getFilterCopy()
    });

    ref.afterDismissed()
      .pipe(filter(f => f instanceof TimesheetListFilter))
      .subscribe(f => this.filterSubject.next(f));
  }

  changeStatus(status: TimesheetStatus) {
    let filter = this.getFilterCopy();
    filter.status = status;
    this.filterSubject.next(filter);
  }

  openTimesheetForm(mission: Mission): void {
    this.dialog.open(TimesheetFormDialogWrapperComponent, {
      data: { mission: mission }
    });
  }

  onBack(): void {
    let returnRoute: string = this.route.snapshot.params["returnRoute"];

    if (returnRoute != undefined) this.router.navigate([returnRoute]);
    else this.router.navigate(["hjem"]);
  }

  getFilterCopy() {
    return Object.assign(
      Object.create(Object.getPrototypeOf(this.filterSubject.value)),
      this.filterSubject.value
    );
  }

  private getInitialFilter(): TimesheetListFilter {
    let filter = new TimesheetListFilter();

    if (this.route.snapshot.params["mission"])
      filter.mission = JSON.parse(this.route.snapshot.params["mission"]);

    if (this.route.snapshot.params["dateRange"]) {
      //Set custom date range if found
      filter.dateRangePreset = DateRangePresets.Custom;
      let dr = JSON.parse(this.route.snapshot.params["dateRange"]);
      dr[0] = new Date(dr[0]);
      dr[1] = new Date(dr[1]);
      filter.dateRange = dr;
    } else if (this.route.snapshot.params["dateRangePreset"]) {
      //Else set preset if found
      filter.dateRangePreset = this.route.snapshot.params["dateRangePreset"];
      filter.dateRange = this.dateTimeService.getRangeByDateRangePreset(
        this.route.snapshot.params["dateRangePreset"]
      );
    } else {
      //Default year preset if no input
      filter.dateRangePreset = DateRangePresets.CurrentYear;
      filter.dateRange = this.dateTimeService.getRangeByDateRangePreset(
        DateRangePresets.CurrentYear
      );
    }
    return filter;
  }

  getCurrentFilter(): TimesheetListFilter {
    return this.filterSubject.value;
  }

  deleteTimesheet = (id: number) => this.userTimesheetService.delete$(id).subscribe();
  
  confirmTimesheet = (id: number) => this.userTimesheetService.changeStatus$(id, TimesheetStatus.Confirmed).subscribe();

}
