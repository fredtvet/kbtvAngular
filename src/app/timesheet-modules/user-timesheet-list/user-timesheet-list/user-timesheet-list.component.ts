import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { filter, tap } from "rxjs/operators";
import { Timesheet } from "src/app/core/models";
import { MainNavService, TopDefaultNavConfig } from 'src/app/layout';
import { TimesheetFilterSheetWrapperComponent } from 'src/app/shared-timesheet/components';
import { TimesheetFormConfig } from 'src/app/shared-timesheet/interfaces';
import { UserTimesheetListStore } from '../user-timesheet-list.store';
import { TimesheetCriteria } from 'src/app/shared/interfaces';

@Component({
  selector: "app-user-timesheet-list",
  templateUrl: "./user-timesheet-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTimesheetListComponent implements OnInit {

  timesheets$: Observable<Timesheet[]> = 
    this.store.filteredTimesheets$.pipe(tap(x => this.configureMainNav(this.store.criteria)));

  constructor(
    private mainNavService: MainNavService,
    private route: ActivatedRoute,
    private router: Router,
    private _bottomSheet: MatBottomSheet,
    private store: UserTimesheetListStore
  ) {}

  ngOnInit() { 
    let initFilter = this.route.snapshot.params.initialFilter;
    initFilter = initFilter ? JSON.parse(initFilter) : {};
    this.store.addCriteria(initFilter);
    this.configureMainNav(initFilter);
  }

  openTimesheetForm = (config: TimesheetFormConfig) => 
    this.router.navigate(['skjema', {config: JSON.stringify(config)}], {relativeTo: this.route});

  deleteTimesheet = (id: number) => this.store.delete$(id).subscribe();

  openFilterSheet = (): void => {
    let ref = this._bottomSheet.open(TimesheetFilterSheetWrapperComponent,  {
      data: {
        filter: this.store.criteria, 
        disabledFilters: ['user'],       
        missions$: this.store.property$("missions")
      }
    });

    ref.afterDismissed()
      .pipe(filter(f => f != null))
      .subscribe(f => this.store.addCriteria(f));
  }
  
  trackByTimesheet = (index: number, timesheet: Timesheet) => 
    timesheet.totalHours && new Date(timesheet.startTime).getTime()

  private onBack = () => {
    let returnUrl: string = this.route.snapshot.params.returnUrl;
    if(returnUrl) this.router.navigateByUrl(returnUrl);
    else this.router.navigate(["/hjem"]);
  }

  private configureMainNav = (criteria: TimesheetCriteria) => {
    let cfg = {
      title:  "Timeliste",
      backFn: this.onBack,
      buttons: [{icon: 'filter_list', colorClass:'color-accent', callback: this.openFilterSheet}]
    } as TopDefaultNavConfig;
    
    let fabs = [
      {icon: "add", aria: 'Legg til', colorClass: 'bg-accent', callback: this.openTimesheetForm, params: [{mission: criteria?.mission}]}
    ];

    this.mainNavService.addConfig({default: cfg}, fabs);
  }

}
