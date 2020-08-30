import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Timesheet } from 'src/app/core/models';
import { LoadingService } from 'src/app/core/services';
import { MainNavService, TopDefaultNavConfig } from 'src/app/layout';
import { TimesheetStatus } from 'src/app/shared-app/enums';
import { WeekFilterSheetWrapperComponent } from 'src/app/shared-timesheet/components/week-filter/week-filter-sheet-wrapper.component';
import { TimesheetAdminStore } from '../timesheet-admin.store';

@Component({
  selector: 'app-timesheet-admin-list',
  templateUrl: './timesheet-admin-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetAdminListComponent{
    
  loading$ = this.loadingService.queryLoading$;
  timesheets$ = this.store.filteredTimesheets$;

  constructor(
    private loadingService: LoadingService,
    private store: TimesheetAdminStore,
    private mainNavService: MainNavService,
    private router: Router,
    private _bottomSheet: MatBottomSheet) {}

  ngOnInit(){
    this.configureNav();
  }

  changeTimesheetStatus = (id: number, status: TimesheetStatus): void => {
    this.store.changeStatus$(id, status).subscribe();
  }

  private openWeekFilter = () => {
    let ref = this._bottomSheet.open(WeekFilterSheetWrapperComponent, {
      data: {filter: this.store.weekFilter, users: this.store.users}
    });

    ref.afterDismissed()
      .pipe(filter(f => f != undefined))
      .subscribe(filter => this.store.addWeekFilter(filter));
  }

  private configureNav(){
    let cfg = {
      title:  "Uke " + this.store.weekFilter.weekNr || "",
      subTitle: this.store.weekFilter.year || "" + ' - ' + this.store.weekFilter.userName || "",
      backFn: this.onBack,
      backFnParams: [null],
      buttons: [{icon: 'filter_list', colorClass: 'color-accent', callback: this.openWeekFilter}]
    } as TopDefaultNavConfig;
    
    this.mainNavService.addConfig({default: cfg});
  }

  private onBack = () => {
    this.store.addWeekFilter({...this.store.weekFilter, weekNr: null});
    this.router.navigate(["timeadministrering/uker"])
  }
  
  trackById = (index:number, timesheet:Timesheet): number => timesheet.id;
}
