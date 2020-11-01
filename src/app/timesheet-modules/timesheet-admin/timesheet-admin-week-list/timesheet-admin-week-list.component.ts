import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Timesheet } from 'src/app/core/models';
import { DeviceInfoService } from 'src/app/core/services/device-info.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { MainTopNavConfig } from 'src/app/shared/components/main-top-nav-bar/main-top-nav.config';
import { WeekCriteriaFormState, WeekCriteriaForm } from 'src/app/shared/constants/forms/week-criteria-controls.const';
import { TimesheetStatus } from 'src/app/shared/enums';
import { FormService } from 'src/app/shared/form';
import { TimesheetSummary, WeekCriteria } from '../../shared-timesheet/interfaces';
import { TimesheetAdminStore } from '../timesheet-admin.store';

interface ViewModel { summaries: TimesheetSummary[], isXs: boolean,  navConfig: MainTopNavConfig  }

@Component({
  selector: 'app-timesheet-admin-week-list',
  templateUrl: './timesheet-admin-week-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetAdminWeekListComponent {
   
  loading$ = this.loadingService.queryLoading$;

  vm$: Observable<ViewModel> = combineLatest([
    this.store.timesheetSummaries$.pipe(map(x => x?.sort((a, b) => b.weekNr - a.weekNr))),
    this.store.weekCriteria$.pipe(map(x => this.getNavConfig(x))),
    this.deviceInfoService.isXs$
  ]).pipe(map(([summaries, navConfig, isXs]) => { 
    return { summaries, navConfig, isXs }
  }));

  constructor(
    private loadingService: LoadingService,
    private store: TimesheetAdminStore,
    private formService: FormService,
    private router: Router,
    private route: ActivatedRoute,
    private deviceInfoService: DeviceInfoService) {
      let filterState = this.route.snapshot.params.filter;
      this.store.addFilterCriteria(filter ? JSON.parse(filterState) : {});
    }

  changeTimesheetStatuses = (timesheets: Timesheet[]): void => {
    if(!timesheets) return;
    
    let ids: string[] = [];
    for(let i = 0; i < timesheets.length; i++){
      const timesheet = timesheets[i];
      if(timesheet.status === TimesheetStatus.Open) ids.push(timesheet.id);
    }

    if(ids.length === 0) return;

    this.store.updateStatuses(ids, TimesheetStatus.Confirmed);
  }

  selectWeek = (weekNr: number) => {
    this.router.navigate(['timer', {
      filter: JSON.stringify({...this.store.weekCriteria, weekNr})
    }], {relativeTo: this.route})
  }

  trackByWeek = (index:number, summary:TimesheetSummary): number => summary.weekNr;

  private openWeekFilter = (): void => {
    this.formService.open<WeekCriteria, WeekCriteriaFormState>({
      formConfig: {...WeekCriteriaForm, 
        disabledControls: {weekNr: true}, 
        noRenderDisabledControls: true,
        initialValue: this.store.weekCriteria}, 
      formState: this.store.weekCriteriaFormState$,
      navConfig: {title: "Velg filtre"},
      submitCallback: (val: WeekCriteria) => this.store.addFilterCriteria(val)
    })
  } 
    
  private onBack = () => { 
    this.router.navigate(["../"], {relativeTo: this.route})
  }

  private getNavConfig(weekCriteria: WeekCriteria): MainTopNavConfig {
    return {
      title:  "Uker",
      subTitle: (weekCriteria?.year || '') + ' - ' + (weekCriteria?.user?.userName || ''),
      backFn: this.onBack,
      buttons: [{icon: 'filter_list', color: 'accent', callback: this.openWeekFilter}]
    }
  }
  
}
