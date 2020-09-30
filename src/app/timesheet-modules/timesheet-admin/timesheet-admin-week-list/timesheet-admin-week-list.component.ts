import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterConfig } from 'src/app/core/filter/interfaces/filter-config.interface';
import { Timesheet } from 'src/app/core/models';
import { FilterSheetService } from 'src/app/core/services/filter';
import { LoadingService } from 'src/app/core/services/loading.service';
import { MainNavService } from 'src/app/layout';
import { FilteredAndGroupedSummaries } from 'src/app/shared-timesheet/base-timesheet-store';
import { WeekFilterViewComponent } from 'src/app/shared-timesheet/components';
import { WeekCriteria, WeekFilterViewConfig } from 'src/app/shared-timesheet/components/week-filter-view/week-filter-view-config.interface';
import { TimesheetCriteria, TimesheetSummary } from 'src/app/shared-timesheet/interfaces';
import { TimesheetStatus } from 'src/app/shared/enums';
import { MainTopNavConfig } from 'src/app/shared/interfaces';
import { ViewModel } from 'src/app/shared/interfaces/view-model.interface';
import { TimesheetAdminStore } from '../timesheet-admin.store';

@Component({
  selector: 'app-timesheet-admin-week-list',
  templateUrl: './timesheet-admin-week-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetAdminWeekListComponent {
   
  loading$ = this.loadingService.queryLoading$;

  vm$: Observable<ViewModel<TimesheetSummary[]>> = this.store.timesheetSummaries$.pipe(
    map(response => { return {
      navConfig: this.getNavConfig(),
      content: response.records?.sort((a, b) => b.week - a.week)
    }})
  );

  constructor(
    private loadingService: LoadingService,
    private store: TimesheetAdminStore,
    private filterService: FilterSheetService,
    private router: Router) {  }


  changeTimesheetStatuses = (timesheets: Timesheet[]): void => {
    if(!timesheets) return;
    
    let ids = timesheets.reduce((_ids, timesheet) => {
      if(timesheet.status ==  TimesheetStatus.Open) _ids.push(timesheet.id);
      return _ids
    }, []);

    if(ids.length == 0) return;

    this.store.changeStatuses(ids, TimesheetStatus.Confirmed);
  }

  selectWeek = (weekNr: number) => {
    this.store.addFilterCriteria({...this.store.weekCriteria, weekNr})
    this.router.navigate(["timeadministrering/uker/timer"])
  }

  trackByWeek = (index:number, summary:TimesheetSummary): number => summary.week;

  private openWeekFilter = () => {
    this.filterService.open<WeekCriteria, FilterConfig<WeekFilterViewConfig>>({
      formConfig: {
        filterConfig: {criteria: this.store.weekCriteria, disabledFilters: ["weekNr"]},
        viewComponent: WeekFilterViewComponent
      },
    });
  }

  private onBack = () => { 
    this.store.addFilterCriteria(null);
    this.router.navigate(["timeadministrering"])
  }

  private getNavConfig(): MainTopNavConfig {
    return {
      title:  "Uker",
      subTitle: (this.store.weekCriteria?.year || '') + ' - ' + (this.store.weekCriteria?.userName || ''),
      backFn: this.onBack,
      buttons: [{icon: 'filter_list', colorClass: 'color-accent', callback: this.openWeekFilter}]
    }
  }
  
}
