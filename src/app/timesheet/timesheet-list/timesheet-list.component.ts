import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { UserTimesheetService, DateTimeService, MainNavService } from "src/app/core/services";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { TimesheetStatus, DateRangePresets } from "src/app/shared/enums";
import { ActivatedRoute, Router } from "@angular/router";
import { Mission, TimesheetListFilter, Timesheet } from "src/app/shared/models";
import { BehaviorSubject, Observable } from "rxjs";
import { switchMap,filter, tap} from "rxjs/operators";
import { TimesheetFilterSheetWrapperComponent } from 'src/app/shared/components';
import { TimesheetFormSheetWrapperComponent } from '../components/timesheet-form/timesheet-form-sheet-wrapper.component';
import { TopDefaultNavConfig } from 'src/app/shared/interfaces';

@Component({
  selector: "app-timesheet-list",
  templateUrl: "./timesheet-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TimesheetListComponent implements OnInit {
  timesheetStatus = TimesheetStatus;

  private filterSubject: BehaviorSubject<TimesheetListFilter>;

  timesheets$: Observable<Timesheet[]>;

  constructor(
    private mainNavService: MainNavService,
    private route: ActivatedRoute,
    private router: Router,
    private _bottomSheet: MatBottomSheet,
    private userTimesheetService: UserTimesheetService,
    private dateTimeService: DateTimeService
  ) {this.configureMainNav();}

  ngOnInit() {
    //Initiate filter and observable
    this.filterSubject = new BehaviorSubject(this.getInitialFilter());
    this.timesheets$ = this.filterSubject.asObservable().pipe(  
      switchMap(filter => this.userTimesheetService.getByWithMission$(t => filter.checkTimesheet(t))),
    );
  }

  openTimesheetForm(missionPreset?: Mission, timesheetIdPreset?: number): void {
    this._bottomSheet.open(TimesheetFormSheetWrapperComponent, { data: { missionPreset, timesheetIdPreset } });
  }

  changeStatus(status: TimesheetStatus) {
    let filter = this.getFilterCopy();
    filter.status = status;
    this.filterSubject.next(filter);
  }

  deleteTimesheet = (id: number) => this.userTimesheetService.delete$(id).subscribe();

  getCurrentFilter = (): TimesheetListFilter => this.filterSubject.value;

  openFilterSheet = (): void => {
    let ref = this._bottomSheet.open(TimesheetFilterSheetWrapperComponent, {
      data: {filter: this.getFilterCopy(), disabledFilters: ['user']}
    });

    ref.afterDismissed()
      .pipe(filter(f => f instanceof TimesheetListFilter))
      .subscribe(f => this.filterSubject.next(f));
  }
  
  private getFilterCopy() { //Copy filter with functionality
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

  private onBack = () => {
    let returnRoute: string = this.route.snapshot.params["returnRoute"];
    if (returnRoute) this.router.navigateByUrl(returnRoute);
    else this.router.navigate(["hjem"]);
  }

  private configureMainNav(){
    let cfg = {
      title:  "Timeliste",
      backFn: this.onBack,
      buttons: [{icon: 'filter_list', colorClass:'color-accent', callback: this.openFilterSheet}]
    } as TopDefaultNavConfig;
    
    this.mainNavService.addTopNavConfig({default: cfg});
  }

}
