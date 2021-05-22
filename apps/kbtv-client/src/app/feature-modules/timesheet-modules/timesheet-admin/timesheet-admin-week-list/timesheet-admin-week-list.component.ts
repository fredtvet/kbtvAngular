import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Timesheet, User } from '@core/models';
import { DeviceInfoService } from '@core/services/device-info.service';
import { WithUnsubscribe } from '@shared-app/mixins/with-unsubscribe.mixin';
import { TimesheetForm } from '@shared-timesheet/forms/save-timesheet-model-forms.const';
import { WeekCriteriaForm, WeekCriteriaFormState } from '@shared-timesheet/forms/week-criteria-controls.const';
import { AppButton } from '@shared/components/app-button/app-button.interface';
import { MainTopNavConfig } from '@shared/components/main-top-nav-bar/main-top-nav.config';
import { BottomIconButtons } from '@shared/constants/bottom-icon-buttons.const';
import { TimesheetStatus } from '@shared/enums';
import { FormService } from 'form-sheet';
import { Immutable, Maybe } from 'global-types';
import { map, takeUntil, tap } from 'rxjs/operators';
import { WeekCriteria } from '../../shared-timesheet/interfaces';
import { TimesheetAdminListWeekNrQueryParam } from '../timesheet-admin-list/timesheet-admin-list-route-params.const';
import { TimesheetAdminFacade } from '../timesheet-admin.facade';
import { TimesheetAdminWeekListCriteriaQueryParam } from './timesheet-admin-week-list-route-params.const';

@Component({
  selector: 'app-timesheet-admin-week-list',
  templateUrl: './timesheet-admin-week-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetAdminWeekListComponent extends WithUnsubscribe() {
  
  summaries$ = this.facade.weeklySummaries$.pipe(
    map(x => x?.sort((x, y) => ((y.year || 0) - (x.year || 0)) || ((y.weekNr || 0) - (x.weekNr || 0))))
  );
  
  isXs$ = this.deviceInfoService.isXs$;

  navConfig$ =  this.facade.weekCriteria$.pipe(map(x => this.getNavConfig(x?.user, x?.year)));

  bottomActions: AppButton[];
  
  actionFab: AppButton = { 
    icon: "add", aria: 'Legg til', 
    callback: () => this.openTimesheetForm(undefined, {user: this.facade.weekCriteria.user}) 
  }

  constructor(
    private facade: TimesheetAdminFacade,
    private formService: FormService,
    private router: Router,
    private route: ActivatedRoute,
    private deviceInfoService: DeviceInfoService) {
      super();
      this.bottomActions = [{...BottomIconButtons.Filter, callback: this.openWeekFilter}];

      this.route.paramMap.pipe( 
        tap(params => this.facade.updateCriteria( JSON.parse(params.get(TimesheetAdminWeekListCriteriaQueryParam) || "{}") )),
        takeUntil(this.unsubscribe),
      ).subscribe();
    }

  openTimesheetForm = (entityId?: Maybe<string>, initialValue?: Immutable<Partial<TimesheetForm>>): void => 
    this.facade.openTimesheetForm(entityId, initialValue);
    
  confirmTimesheets = (timesheets: Timesheet[]): void => {
    if(!timesheets) return;
    
    let ids: string[] = [];
    for(let i = 0; i < timesheets.length; i++){
      const timesheet = timesheets[i];
      if(timesheet.id && timesheet.status === TimesheetStatus.Open) ids.push(timesheet.id);
    }

    if(ids.length === 0) return;

    this.facade.updateStatuses(ids, TimesheetStatus.Confirmed);
  }

  selectWeek = (weekNr: number) => 
    this.router.navigate(['timer', {[TimesheetAdminListWeekNrQueryParam]: weekNr}], {relativeTo: this.route})
  
  private openWeekFilter = (): void => {
    this.formService.open<WeekCriteriaForm, WeekCriteriaFormState>({
      formConfig: {...WeekCriteriaForm, 
        options: { onlineRequired: true, noRenderDisabledControls: true },   
        disabledControls: {weekNr: true}}, 
      formState: this.facade.weekCriteriaFormState$,
      navConfig: {title: "Velg filtre"},
      submitCallback: (val: WeekCriteria) => this.facade.updateCriteria(val)
    }, this.facade.weekCriteria)
  } 
    
  private onBack = () => { 
    this.router.navigate(["../"], {relativeTo: this.route})
  }

  private getNavConfig(user: Maybe<Immutable<User>>, year: Maybe<number>): MainTopNavConfig {
    const fullName = user ? (user.firstName + ' ' + user.lastName) : '';
    return {
      title:  "Uker",
      subTitle: (year || '') + ' - ' + (fullName || ''),
      backFn: this.onBack
    }
  }
  
}
