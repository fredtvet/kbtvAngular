import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Timesheet } from 'src/app/core/models';
import { LoadingService } from 'src/app/core/services/loading.service';
import { _getWeekOfYear } from 'src/app/shared-app/helpers/datetime/get-week-of-year.helper';
import { _trackByModel } from 'src/app/shared-app/helpers/trackby/track-by-model.helper';
import { MainTopNavConfig } from 'src/app/shared/components/main-top-nav-bar/main-top-nav.config';
import { WeekCriteriaForm, WeekCriteriaFormState } from 'src/app/shared/constants/forms/week-criteria-controls.const';
import { TimesheetStatus } from 'src/app/shared/enums';
import { FormService } from 'src/app/shared/form';
import { WeekCriteria } from '../../shared-timesheet/interfaces';
import { TimesheetAdminFacade } from '../timesheet-admin.facade';

@Component({
  selector: 'app-timesheet-admin-list',
  templateUrl: './timesheet-admin-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetAdminListComponent{
    
  loading$ = this.loadingService.queryLoading$;

  timesheets$: Observable<Timesheet[]> = this.facade.selectedWeekTimesheets$;

  navConfig$: Observable<MainTopNavConfig> = combineLatest([
    this.facade.selectedWeekNr$,
    this.facade.weekCriteria$
  ]).pipe(map(([weekNr, weekCriteria]) => this.getNavConfig({...weekCriteria, weekNr})))

  constructor(
    private loadingService: LoadingService,
    private facade: TimesheetAdminFacade,
    private router: Router,
    private route: ActivatedRoute,
    private formService: FormService) {
      this.facade.updateWeekNr(this.route.snapshot.params.weekNr || _getWeekOfYear());    
    }

  toggleTimesheetStatus = (timesheet: Timesheet): void => 
    this.facade.updateStatuses(
      [timesheet.id],  
      timesheet.status === TimesheetStatus.Confirmed ? TimesheetStatus.Open : TimesheetStatus.Confirmed
    );

  trackById = _trackByModel("timesheets");
  
  private openWeekFilter = () => 
    this.formService.open<WeekCriteria, WeekCriteriaFormState>({
      formConfig: {...WeekCriteriaForm, initialValue: {...this.facade.weekCriteria, weekNr: this.facade.selectedWeekNr}}, 
      formState: this.facade.weekCriteriaFormState$,
      navConfig: {title: "Velg filtre"},
      submitCallback: (val: WeekCriteria): void => {
        this.facade.updateWeekNr(val.weekNr)
        this.facade.updateCriteria(val)
      }
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
