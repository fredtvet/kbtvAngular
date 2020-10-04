import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Timesheet } from 'src/app/core/models';
import { FilterSheetService } from 'src/app/core/services/filter/filter-sheet.service';
import { FilterConfig } from 'src/app/core/services/filter/interfaces';
import { LoadingService } from 'src/app/core/services/loading.service';
import { WeekFilterViewComponent } from 'src/app/shared-timesheet/components';
import { WeekCriteria, WeekFilterViewConfig } from 'src/app/shared-timesheet/components/week-filter-view/week-filter-view-config.interface';
import { TimesheetStatus } from 'src/app/shared/enums';
import { MainTopNavConfig } from 'src/app/shared/interfaces';
import { BaseViewModel } from 'src/app/shared/interfaces/base-view-model.interface';
import { TrackByModel } from 'src/app/shared/trackby/track-by-model.helper';
import { TimesheetAdminStore } from '../timesheet-admin.store';

interface ViewModel extends BaseViewModel { timesheets: Timesheet[] }

@Component({
  selector: 'app-timesheet-admin-list',
  templateUrl: './timesheet-admin-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetAdminListComponent{
    
  loading$ = this.loadingService.queryLoading$;

  vm$: Observable<ViewModel> = this.store.filteredTimesheets$.pipe(
    map(x => { return {
      navConfig: this.getTopNavConfig(),
      timesheets: x.records
    }})
  );

  constructor(
    private loadingService: LoadingService,
    private store: TimesheetAdminStore,
    private router: Router,
    private filterService: FilterSheetService) {}

  changeTimesheetStatus = (id: string, status: TimesheetStatus): void => 
    this.store.changeStatus({id, status});

  trackById = TrackByModel("timesheets");
  
  private openWeekFilter = () => {
    this.filterService.open<WeekCriteria, FilterConfig<WeekFilterViewConfig>>({
      formConfig: {viewComponent: WeekFilterViewComponent},
    });
  }

  private getTopNavConfig(): MainTopNavConfig {
    return {
      title:  "Uke " + this.store.weekCriteria.weekNr || "",
      subTitle: (this.store.weekCriteria.year || "") + ' - ' + (this.store.weekCriteria.user?.userName || ""),
      backFn: this.onBack,
      backFnParams: [null],
      buttons: [{icon: 'filter_list', colorClass: 'color-accent', callback: this.openWeekFilter}]
    }
  }

  private onBack = () => {
    this.store.addFilterCriteria({...this.store.weekCriteria, weekNr: null});
    this.router.navigate(["timeadministrering/uker"])
  }

}
