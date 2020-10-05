import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
import { Timesheet } from 'src/app/core/models';
import { DeviceInfoService } from 'src/app/core/services/device-info.service';
import { FilterSheetService } from 'src/app/core/services/filter/filter-sheet.service';
import { FilterConfig } from 'src/app/core/services/filter/interfaces';
import { LoadingService } from 'src/app/core/services/loading.service';
import { WeekFilterViewComponent } from 'src/app/shared-timesheet/components';
import { WeekCriteria, WeekFilterViewConfig } from 'src/app/shared-timesheet/components/week-filter-view/week-filter-view-config.interface';
import { TimesheetSummary } from 'src/app/shared-timesheet/interfaces';
import { TimesheetStatus } from 'src/app/shared/enums';
import { MainTopNavConfig } from 'src/app/shared/interfaces';
import { BaseViewModel } from 'src/app/shared/interfaces/base-view-model.interface';
import { TimesheetAdminStore } from '../timesheet-admin.store';

interface ViewModel extends BaseViewModel { summaries: TimesheetSummary[], isXs: boolean }

@Component({
  selector: 'app-timesheet-admin-week-list',
  templateUrl: './timesheet-admin-week-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetAdminWeekListComponent {
   
  loading$ = this.loadingService.queryLoading$;

  vm$: Observable<ViewModel> = combineLatest([
    this.store.timesheetSummaries$.pipe(map(x => x.records?.sort((a, b) => b.week - a.week))),
    this.store.weekCriteria$.pipe(map(x => this.getNavConfig(x))),
    this.deviceInfoService.isXs$
  ]).pipe(map(([summaries, navConfig, isXs]) => { 
    return { summaries, navConfig, isXs }
  }));

  constructor(
    private loadingService: LoadingService,
    private store: TimesheetAdminStore,
    private filterService: FilterSheetService,
    private router: Router,
    private deviceInfoService: DeviceInfoService) {  }


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

  private getNavConfig(weekCriteria: WeekCriteria): MainTopNavConfig {
    return {
      title:  "Uker",
      subTitle: (weekCriteria?.year || '') + ' - ' + (weekCriteria?.user?.userName || ''),
      backFn: this.onBack,
      buttons: [{icon: 'filter_list', colorClass: 'color-accent', callback: this.openWeekFilter}]
    }
  }
  
}
