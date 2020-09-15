import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Timesheet } from 'src/app/core/models';
import { LoadingService } from 'src/app/core/services';
import { MainNavService, TopDefaultNavConfig } from 'src/app/layout';
import { TimesheetAdminStore } from '../timesheet-admin.store';
import { TimesheetStatus } from 'src/app/shared-app/enums';
import { TimesheetSummary } from 'src/app/shared-timesheet/interfaces';
import { FilterSheetService } from 'src/app/core/services/filter';
import { WeekCriteria, WeekFilterViewConfig } from 'src/app/shared-timesheet/components/week-filter-view/week-filter-view-config.interface';
import { WeekFilterViewComponent } from 'src/app/shared-timesheet/components';
import { FilterConfig } from 'src/app/core/filter/interfaces/filter-config.interface';

@Component({
  selector: 'app-timesheet-admin-week-list',
  templateUrl: './timesheet-admin-week-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetAdminWeekListComponent{
   
  loading$ = this.loadingService.queryLoading$;

  summaries$: Observable<TimesheetSummary[]> = this.store.timesheetSummaries$.pipe(
    tap(x => this.configureNav()),
    map(summaries => summaries?.sort((a, b) => b.week - a.week))
  );

  constructor(
    private loadingService: LoadingService,
    private store: TimesheetAdminStore,
    private mainNavService: MainNavService,
    private filterService: FilterSheetService,
    private router: Router) {  }

  ngOnInit(){
    this.configureNav(); 
  }

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

  private configureNav(){
    let cfg = {
      title:  "Uker",
      subTitle: this.store.weekCriteria?.year || '' + ' - ' + this.store.weekCriteria?.userName || '',
      backFn: this.onBack,
      buttons: [{icon: 'filter_list', colorClass: 'color-accent', callback: this.openWeekFilter}]
    } as TopDefaultNavConfig;
    
    this.mainNavService.addConfig({default: cfg});
  }
  
  trackByWeek = (index:number, summary:TimesheetSummary): number => summary.week;
}
