import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Timesheet } from 'src/app/core/models';
import { LoadingService } from 'src/app/core/services';
import { MainNavService, TopDefaultNavConfig } from 'src/app/layout';
import { WeekFilterSheetWrapperComponent } from 'src/app/shared-timesheet/components/week-filter/week-filter-sheet-wrapper.component';
import { TimesheetAdminStore } from '../timesheet-admin.store';
import { TimesheetSummary } from 'src/app/shared/interfaces';
import { TimesheetStatus } from 'src/app/shared-app/enums';

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
    private _bottomSheet: MatBottomSheet, 
    private router: Router) {  }

  ngOnInit(){
    this.configureNav(); 
  }

  changeTimesheetStatuses = (timesheets: Timesheet[]): void => {
    if(!timesheets) return undefined;
    let ids = timesheets.reduce((_ids, timesheet) => {
      if(timesheet.status ==  TimesheetStatus.Open) _ids.push(timesheet.id);
      return _ids
    }, []);
    if(ids.length == 0) return undefined;

    this.store.changeStatuses$(ids, TimesheetStatus.Confirmed).subscribe();
  }

  selectWeek = (weekNr: number) => {
    this.store.addWeekFilter({...this.store.weekFilter, weekNr})
    this.router.navigate(["timeadministrering/uker/timer"])
  }

  private openWeekFilter = () => {
    let ref = this._bottomSheet.open(WeekFilterSheetWrapperComponent, {
      data: {filter: this.store.weekFilter, users: this.store.users}
    });

    ref.afterDismissed()
      .pipe(filter(f => f != undefined))
      .subscribe(filter => this.store.addWeekFilter(filter));
  }

  private onBack = () => { 
    this.store.addCriteria(null);
    this.router.navigate(["timeadministrering"])
  }

  private configureNav(){
    let cfg = {
      title:  "Uker",
      subTitle: this.store.weekFilter?.year || '' + ' - ' + this.store.weekFilter?.userName || '',
      backFn: this.onBack,
      buttons: [{icon: 'filter_list', colorClass: 'color-accent', callback: this.openWeekFilter}]
    } as TopDefaultNavConfig;
    
    this.mainNavService.addConfig({default: cfg});
  }
  
  trackByWeek = (index:number, summary:TimesheetSummary): number => summary.week;
}
