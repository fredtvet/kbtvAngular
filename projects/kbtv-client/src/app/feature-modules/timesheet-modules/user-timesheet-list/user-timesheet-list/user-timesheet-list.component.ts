import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { Timesheet } from '@core/models';
import { ChipsFactoryService } from '@core/services/ui/chips-factory.service';
import { ModelState } from '@core/state/model-state.interface';
import { ModelFormService } from 'model-form';
import { _getSetPropCount } from '@shared-app/helpers/object/get-set-prop-count.helper';
import { AppButton } from '@shared-app/interfaces';
import { AppChip } from '@shared-app/interfaces/app-chip.interface';
import { MainTopNavConfig } from '@shared/components/main-top-nav-bar/main-top-nav.config';
import { TimesheetCriteriaForm, TimesheetCriteriaFormState } from '@shared/constants/forms/timesheet-criteria-form.const';
import { CreateUserTimesheetForm, EditUserTimesheetForm, TimesheetForm } from '@shared/constants/model-forms/save-user-timesheet-form.const';
import { DynamicForm, _objectToDisabledObjectMap } from 'dynamic-forms';
import { FormService, OptionsFormState } from 'form-sheet';
import { Immutable, ImmutableArray, Maybe, Prop } from 'global-types';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { TimesheetCriteriaChipOptions } from '../../shared-timesheet/timesheet-filter/timesheet-criteria-chip-options.const';
import { TimesheetCriteria } from '../../shared-timesheet/timesheet-filter/timesheet-criteria.interface';
import { UserTimesheetListFacade } from './user-timesheet-list.facade';
import { UserTimesheetListProviders } from './user-timesheet-list.state';

interface ViewModel { 
  timesheets: ImmutableArray<Timesheet>;
  fabs: AppButton[], 
  criteriaChips: AppChip[], 
  navConfig: MainTopNavConfig  
}

@Component({
  selector: "app-user-timesheet-list",
  templateUrl: "./user-timesheet-list.component.html",
  providers: UserTimesheetListProviders,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTimesheetListComponent {

  navVm$: Observable<Partial<ViewModel>> = this.facade.criteria$.pipe(
    map(criteria => { return {
      navConfig: this.getTopNavConfig(criteria),
      fabs: [
        {icon: "add", aria: 'Legg til', color: 'accent', 
          callback: this.openTimesheetForm,
          params: [null, {mission: criteria?.mission}]}
      ],
      criteriaChips: this.chipsFactory.createCriteriaChips(criteria, 
          (prop) => this.resetCriteriaProp(prop, criteria),
          TimesheetCriteriaChipOptions
        )
    }})
  )

  timesheets$ = this.facade.timesheets$;

  constructor(
    private facade: UserTimesheetListFacade,
    private route: ActivatedRoute,
    private router: Router,
    private formService: FormService,
    private chipsFactory: ChipsFactoryService,
    private modelFormService: ModelFormService
  ) {}
  
  openTimesheetForm = (entityId?: string, initialValue?: TimesheetForm): void => {
    let dynamicForm: DynamicForm<TimesheetForm, OptionsFormState<Partial<ModelState>>>;
    if(!entityId) dynamicForm = {...CreateUserTimesheetForm, disabledControls: _objectToDisabledObjectMap(initialValue)}
    else dynamicForm = EditUserTimesheetForm

    this.modelFormService.open<ModelState, TimesheetForm>({
      formConfig:{
        dynamicForm: {...dynamicForm, initialValue}, entityId,
        stateProp: "userTimesheets",  
      }
    })
  };

  openTimesheetFilter = (): void => {
    this.formService.open<TimesheetCriteria, TimesheetCriteriaFormState>({
      formConfig: { ...TimesheetCriteriaForm, 
        disabledControls: {user: true},
        initialValue: this.facade.criteria}, 
      formState: this.facade.timesheetCriteriaFormState$,
      navConfig: {title: "Velg filtre"},
      submitCallback: (val: TimesheetCriteria) => this.facade.updateCriteria(val)
    });
  }

  private onBack = (): void => {
    this.router.navigate(['../'], { relativeTo: this.route.parent })
  }

  private getTopNavConfig = (criteria: Maybe<Immutable<TimesheetCriteria>>): MainTopNavConfig => {
    let activeCriteriaCount = criteria ? _getSetPropCount(criteria, {dateRangePreset:null}) : 0
    return {
      title:  "Timeliste", 
      backFn: this.onBack,     
      buttons: [{
        icon: 'filter_list', 
        callback: this.openTimesheetFilter,
        color: (activeCriteriaCount && activeCriteriaCount > 0) ? "accent" : undefined
      }],
    }
  }
  
  private resetCriteriaProp(prop: Prop<Immutable<TimesheetCriteria>>, criteria: Maybe<Immutable<TimesheetCriteria>>){
    const clone = {...criteria || {}};
    clone[prop] = undefined;
    this.facade.updateCriteria(clone);
  }
}
