import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Timesheet, User } from '@core/models';
import { AppDialogService } from '@core/services/app-dialog.service';
import { TimesheetStatus } from '@shared-app/enums/timesheet-status.enum';
import { _trackByModel } from '@shared-app/helpers/trackby/track-by-model.helper';
import { AppButton } from '@shared-app/interfaces/app-button.interface';
import { WithUnsubscribe } from '@shared-app/mixins/with-unsubscribe.mixin';
import { TimesheetForm } from '@shared-timesheet/forms/save-timesheet-model-forms.const';
import { MainTopNavConfig } from '@shared/components/main-top-nav-bar/main-top-nav.config';
import { BottomIconButtons } from '@shared/constants/bottom-icon-buttons.const';
import { _getWeekYear } from 'date-time-helpers';
import { FormService } from 'form-sheet';
import { Immutable, Maybe } from 'global-types';
import { combineLatest, Observable } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { AdminTimesheetCardDialogWrapperComponent } from '../components/admin-timesheet-card-dialog-wrapper.component';
import { TimesheetAdminFacade } from '../timesheet-admin.facade';
import { TimesheetAdminListWeekNrQueryParam } from './timesheet-admin-list-route-params.const';
import { TimesheetAdminListWeekCriteriaFormSheet } from './timesheet-admin-list-week-criteria-form-sheet.const';

@Component({
  selector: 'app-timesheet-admin-list',
  templateUrl: './timesheet-admin-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetAdminListComponent extends WithUnsubscribe() {

  timesheets$ = this.facade.selectedWeekTimesheets$;

  navConfig$: Observable<MainTopNavConfig> = combineLatest([
    this.facade.selectedWeekNr$,
    this.facade.weekCriteria$
  ]).pipe(map(([weekNr, weekCriteria]) => this.getNavConfig(weekCriteria?.user, weekCriteria?.year, weekNr)))

  bottomActions: AppButton[];

  actionFab: AppButton = { 
    icon: "add", aria: 'Legg til', 
    callback: () => this.openTimesheetForm(undefined, {user: this.facade.weekCriteria.user}) 
  }

  constructor(
    private facade: TimesheetAdminFacade,
    private router: Router,
    private dialogService: AppDialogService,
    private route: ActivatedRoute,
    private formService: FormService) {
      super();
      this.bottomActions = [{...BottomIconButtons.Filter, callback: this.openWeekFilter}];
      
      this.route.paramMap.pipe(
        tap(x => this.facade.updateWeekNr(x.get(TimesheetAdminListWeekNrQueryParam) || _getWeekYear().weekNr)), 
        takeUntil(this.unsubscribe)
      ).subscribe();
    }

  toggleTimesheetStatus = (timesheet: Immutable<Timesheet>): void => 
    this.facade.updateStatuses([<string> timesheet.id],  
      timesheet.status === TimesheetStatus.Confirmed ? TimesheetStatus.Open : TimesheetStatus.Confirmed
    );

  openTimesheetForm = (entityId?: Maybe<string>, initialValue?: Immutable<Partial<TimesheetForm>>): void => 
    this.facade.openTimesheetForm(entityId, initialValue);
  
  openTimesheetCard = (timesheet: Immutable<Timesheet>) =>
    this.dialogService.dialog$.subscribe(x => x.open(AdminTimesheetCardDialogWrapperComponent, {
      data: timesheet, panelClass: 'extended-dialog'}));

  trackById = _trackByModel("timesheets");
  
  private openWeekFilter = () => 
    this.formService.open(TimesheetAdminListWeekCriteriaFormSheet, 
    { 
      initialValue: {...this.facade.weekCriteria, weekNr: <number>this.facade.selectedWeekNr},
      formState: this.facade.weekCriteriaFormState$
    },
    (val) => {
      if(val.weekNr) this.facade.updateWeekNr(val.weekNr)
      this.facade.updateCriteria(val)
    }
  );
  
  private getNavConfig(user: Maybe<Immutable<User>>, year: Maybe<number>, weekNr: Maybe<number>): MainTopNavConfig {
    const fullName = user ? (user.firstName + ' ' + user.lastName) : '';
    return {
      title:  "Uke " + (weekNr || ""),
      subTitle: (year || "") + ' - ' + (fullName || ""),
      backFn: this.onBack
    }
  }

  private onBack = () => 
    this.router.navigate(['../'], {relativeTo: this.route})
  
}
