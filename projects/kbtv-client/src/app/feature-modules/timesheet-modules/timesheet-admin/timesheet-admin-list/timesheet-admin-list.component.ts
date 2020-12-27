import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Timesheet, User } from '@core/models';
import { LoadingService } from '@core/services/loading.service';
import { _getWeekOfYear } from '@datetime/get-week-of-year.helper';
import { _trackByModel } from '@shared-app/helpers/trackby/track-by-model.helper';
import { WithUnsubscribe } from '@shared-app/mixins/with-unsubscribe.mixin';
import { MainTopNavConfig } from '@shared/components/main-top-nav-bar/main-top-nav.config';
import { WeekCriteriaForm, WeekCriteriaFormState } from '@shared/constants/forms/week-criteria-controls.const';
import { TimesheetStatus } from '@shared/enums';
import { TimesheetAdminFacade } from '../timesheet-admin.facade';
import { FormService } from '@form-sheet/form-sheet.service';
import { WeekCriteria } from '@shared-timesheet/interfaces';
import { Maybe, Immutable } from '@global/interfaces';

@Component({
  selector: 'app-timesheet-admin-list',
  templateUrl: './timesheet-admin-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimesheetAdminListComponent extends WithUnsubscribe() {
    
  loading$ = this.loadingService.queryLoading$;

  timesheets$ = this.facade.selectedWeekTimesheets$;

  navConfig$: Observable<MainTopNavConfig> = combineLatest([
    this.facade.selectedWeekNr$,
    this.facade.weekCriteria$
  ]).pipe(map(([weekNr, weekCriteria]) => this.getNavConfig(weekCriteria?.user, weekCriteria?.year, weekNr)))

  constructor(
    private loadingService: LoadingService,
    private facade: TimesheetAdminFacade,
    private router: Router,
    private route: ActivatedRoute,
    private formService: FormService) {
      super();
      this.route.paramMap.pipe(
        tap(x => this.facade.updateWeekNr(x.get('weekNr') || _getWeekOfYear())), 
        takeUntil(this.unsubscribe)
      ).subscribe();
    }

  toggleTimesheetStatus = (timesheet: Timesheet): void => 
    this.facade.updateStatuses([<string> timesheet.id],  
      timesheet.status === TimesheetStatus.Confirmed ? TimesheetStatus.Open : TimesheetStatus.Confirmed
    );

  trackById = _trackByModel("timesheets");
  
  private openWeekFilter = () => 
    this.formService.open<WeekCriteria, WeekCriteriaFormState>({
      formConfig: {...WeekCriteriaForm, initialValue: {...this.facade.weekCriteria, weekNr: <number>this.facade.selectedWeekNr}}, 
      formState: this.facade.weekCriteriaFormState$,
      navConfig: {title: "Velg filtre"},
      submitCallback: (val: WeekCriteria): void => {
        if(val.weekNr) this.facade.updateWeekNr(val.weekNr)
        this.facade.updateCriteria(val)
      }
    });
  
  private getNavConfig(user: Maybe<Immutable<User>>, year: Maybe<number>, weekNr: Maybe<number>): MainTopNavConfig {
    const fullName = user ? (user.firstName + ' ' + user.lastName) : '';
    return {
      title:  "Uke " + (weekNr || ""),
      subTitle: (year || "") + ' - ' + (fullName || ""),
      backFn: this.onBack,
      backFnParams: [null],
      buttons: [{icon: 'filter_list', color: 'accent', callback: this.openWeekFilter}]
    }
  }

  private onBack = () => 
    this.router.navigate(['../'], {relativeTo: this.route})
  
}
