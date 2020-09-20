import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { filter, pluck, tap } from 'rxjs/operators';
import { FilterConfig } from 'src/app/core/filter/interfaces/filter-config.interface';
import { Timesheet } from 'src/app/core/models';
import { LoadingService } from 'src/app/core/services';
import { FilterSheetService } from 'src/app/core/services/filter';
import { MainNavService, TopDefaultNavConfig } from 'src/app/layout';
import { TimesheetStatus } from 'src/app/shared-app/enums';
import { WeekFilterViewComponent } from 'src/app/shared-timesheet/components';
import { WeekCriteria, WeekFilterViewConfig } from 'src/app/shared-timesheet/components/week-filter-view/week-filter-view-config.interface';
import { TimesheetCriteria } from 'src/app/shared-timesheet/interfaces';
import { TimesheetAdminStore } from '../timesheet-admin.store';

@Component({
  selector: 'app-timesheet-admin-list',
  templateUrl: './timesheet-admin-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetAdminListComponent{
    
  loading$ = this.loadingService.queryLoading$;
  timesheets$ = this.store.filteredTimesheets$.pipe(tap(x => this.configureNav(x.criteria)), pluck("records"));

  constructor(
    private loadingService: LoadingService,
    private store: TimesheetAdminStore,
    private mainNavService: MainNavService,
    private router: Router,
    private filterService: FilterSheetService) {}

  changeTimesheetStatus = (id: string, status: TimesheetStatus): void => 
    this.store.changeStatus({id, status});
  
  private openWeekFilter = () => {
    this.filterService.open<WeekCriteria, FilterConfig<WeekFilterViewConfig>>({
      formConfig: {viewComponent: WeekFilterViewComponent},
    });
  }

  private configureNav(criteria: TimesheetCriteria){
    let cfg = {
      title:  "Uke " + this.store.weekCriteria.weekNr || "",
      subTitle: this.store.weekCriteria.year || "" + ' - ' + this.store.weekCriteria.userName || "",
      backFn: this.onBack,
      backFnParams: [null],
      buttons: [{icon: 'filter_list', colorClass: 'color-accent', callback: this.openWeekFilter}]
    } as TopDefaultNavConfig;
    
    this.mainNavService.addConfig({default: cfg});
  }

  private onBack = () => {
    this.store.addFilterCriteria({...this.store.weekCriteria, weekNr: null});
    this.router.navigate(["timeadministrering/uker"])
  }
  
  trackById = (index:number, timesheet:Timesheet): string => timesheet.id;
}
