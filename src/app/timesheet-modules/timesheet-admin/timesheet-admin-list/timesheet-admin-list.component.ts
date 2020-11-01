import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Timesheet } from 'src/app/core/models';
import { LoadingService } from 'src/app/core/services/loading.service';
import { _trackByModel } from 'src/app/shared-app/helpers/trackby/track-by-model.helper';
import { MainTopNavConfig } from 'src/app/shared/components/main-top-nav-bar/main-top-nav.config';
import { WeekCriteriaFormState, WeekCriteriaForm } from 'src/app/shared/constants/forms/week-criteria-controls.const';
import { TimesheetStatus } from 'src/app/shared/enums';
import { FormService } from 'src/app/shared/form';
import { WeekCriteria } from '../../shared-timesheet/interfaces';
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
    private formService: FormService) {
      let filterState = this.route.snapshot.params.filter;
      this.store.addFilterCriteria(filterState ? JSON.parse(filterState) : {});    
    }

  toggleTimesheetStatus = (timesheet: Timesheet): void => 
    this.store.updateStatus({
      id: timesheet.id, 
      status: timesheet.status === TimesheetStatus.Confirmed ? TimesheetStatus.Open : TimesheetStatus.Confirmed
    });

  trackById = _trackByModel("timesheets");
  
  private openWeekFilter = () => 
    this.formService.open<WeekCriteria, WeekCriteriaFormState>({
      formConfig: {...WeekCriteriaForm, initialValue: this.store.weekCriteria}, 
      formState: this.store.weekCriteriaFormState$,
      navConfig: {title: "Velg filtre"},
      submitCallback: (val: WeekCriteria) => this.store.addFilterCriteria(val)
    });
  
  private getNavConfig(weekCriteria: WeekCriteria): MainTopNavConfig {
    return {
      title:  "Uke " + weekCriteria?.weekNr || "",
      subTitle: (weekCriteria?.year || "") + ' - ' + (weekCriteria?.user?.userName || ""),
      backFn: this.onBack,
      backFnParams: [null],
      buttons: [{icon: 'filter_list', color: 'accent', callback: this.openWeekFilter}]
    }
  }

  private onBack = () => 
    this.router.navigate(['../'], {relativeTo: this.route})
  
}
