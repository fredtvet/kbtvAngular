import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Timesheet } from 'src/app/core/models';
import { FilterSheetService } from 'src/app/core/services/filter/filter-sheet.service';
import { FilterConfig } from 'src/app/core/services/filter/interfaces';
import { LoadingService } from 'src/app/core/services/loading.service';
import { WeekFilterViewComponent } from 'src/app/shared-timesheet/components';
import { WeekCriteria, WeekFilterViewConfig } from 'src/app/shared-timesheet/components/week-filter-view/week-filter-view-config.interface';
import { MainTopNavConfig } from 'src/app/shared/components/main-top-nav-bar/main-top-nav.config';
import { TimesheetStatus } from 'src/app/shared/enums';
import { TrackByModel } from 'src/app/shared/trackby/track-by-model.helper';
import { TimesheetAdminStore } from '../timesheet-admin.store';

interface ViewModel { timesheets: Timesheet[],  navConfig: MainTopNavConfig  }

@Component({
  selector: 'app-timesheet-admin-list',
  templateUrl: './timesheet-admin-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetAdminListComponent{
    
  loading$ = this.loadingService.queryLoading$;

  vm$: Observable<ViewModel> = combineLatest([
    this.store.filteredTimesheets$,
    this.store.weekCriteria$.pipe(map(x => this.getNavConfig(x)))
  ]).pipe(map(([filtered, navConfig]) => { 
    return { navConfig, timesheets: filtered.records }
  }));

  constructor(
    private loadingService: LoadingService,
    private store: TimesheetAdminStore,
    private router: Router,
    private route: ActivatedRoute,
    private filterService: FilterSheetService) {
      let filter = this.route.snapshot.params.filter;
      this.store.addFilterCriteria(filter ? JSON.parse(filter) : {});    
    }

  toggleTimesheetStatus = (timesheet: Timesheet): void => 
    this.store.changeStatus({
      id: timesheet.id, 
      status: timesheet.status ? TimesheetStatus.Open : TimesheetStatus.Confirmed
    });

  trackById = TrackByModel("timesheets");
  
  private openWeekFilter = () => {
    this.filterService.open<WeekCriteria, FilterConfig<WeekFilterViewConfig>>({
      formConfig: {viewComponent: WeekFilterViewComponent},
    });
  }

  private getNavConfig(weekCriteria: WeekCriteria): MainTopNavConfig {
    return {
      title:  "Uke " + weekCriteria?.weekNr || "",
      subTitle: (weekCriteria?.year || "") + ' - ' + (weekCriteria?.user?.userName || ""),
      backFn: this.onBack,
      backFnParams: [null],
      buttons: [{icon: 'filter_list', colorClass: 'color-accent', callback: this.openWeekFilter}]
    }
  }

  private onBack = () => {
    this.router.navigate(['timeadministrering/uker', {
      filter: JSON.stringify({...this.store.weekCriteria, weekNr: null})
    }])
  }

}
