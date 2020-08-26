import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { filter, tap } from "rxjs/operators";
import { Mission, Timesheet } from "src/app/core/models";
import { DateTimeService, MainNavService, LoadingService } from "src/app/core/services";
import { TimesheetCriteria, TopDefaultNavConfig } from 'src/app/shared-app/interfaces';
import { TimesheetFilterSheetWrapperComponent } from 'src/app/shared-timesheet/components';
import { UserTimesheetListStore } from '../user-timesheet-list.store';

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

  openTimesheetForm = (missionPreset?: Mission, idPreset?: number) => 
    this.router.navigate(['skjema'], {relativeTo: this.route, queryParams: {idPreset, missionPreset: JSON.stringify(missionPreset)}});

  deleteTimesheet = (id: number) => this.store.delete$(id).subscribe();

  openFilterSheet = (): void => {
    let ref = this._bottomSheet.open(TimesheetFilterSheetWrapperComponent,  {
      data: {
        filter: this.store.criteria, 
        disabledFilters: ['user'],       
        missions: this.store.getProperty("missions")
      }
    });

    ref.afterDismissed()
      .pipe(filter(f => f != null))
      .subscribe(f => this.store.addCriteria(f));
  }

  private onBack = () => {
    let returnUrl: string = this.route.snapshot.params.returnUrl;
    if(returnUrl) this.router.navigateByUrl(returnUrl);
    else this.router.navigate([""]);
  }

  private configureMainNav = (criteria: TimesheetCriteria) => {
    let cfg = {
      title:  "Timeliste",
      backFn: this.onBack,
      buttons: [{icon: 'filter_list', colorClass:'color-accent', callback: this.openFilterSheet}]
    } as TopDefaultNavConfig;
    
    let fabs = [
      {icon: "add", aria: 'Legg til', colorClass: 'bg-accent', callback: this.openTimesheetForm, params: [criteria?.mission]}
    ];

    this.mainNavService.addConfig({default: cfg}, fabs);
  }

}
