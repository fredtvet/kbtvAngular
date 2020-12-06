import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Timesheet } from 'src/app/core/models';
import { ChipsFactoryService } from 'src/app/core/services/ui/chips-factory.service';
import { _objectToDisabledObjectMap } from 'src/app/dynamic-forms/helpers/disabled-control-map.helper';
import { DynamicForm } from 'src/app/dynamic-forms/interfaces';
import { ModelState } from 'src/app/model/interfaces';
import { _getSetPropCount } from 'src/app/shared-app/helpers/object/get-set-prop-count.helper';
import { AppButton } from 'src/app/shared-app/interfaces';
import { AppChip } from 'src/app/shared-app/interfaces/app-chip.interface';
import { MainTopNavConfig } from 'src/app/shared/components/main-top-nav-bar/main-top-nav.config';
import { TimesheetCriteriaForm, TimesheetCriteriaFormState } from 'src/app/shared/constants/forms/timesheet-criteria-form.const';
import { CreateUserTimesheetForm, EditUserTimesheetForm, TimesheetForm } from 'src/app/shared/constants/model-forms/save-user-timesheet-form.const';
import { FormService } from 'src/app/shared/form';
import { ModelFormService, SaveModelFormState } from 'src/app/shared/model-form';
import { UserTimesheetFormToSaveModelAdapter } from '../../shared-timesheet/state/save-user-timesheet/user-timesheet-form-to-save-model.adapter';
import { TimesheetCriteriaChipOptions } from '../../shared-timesheet/timesheet-filter/timesheet-criteria-chip-options.const';
import { TimesheetCriteria } from '../../shared-timesheet/timesheet-filter/timesheet-criteria.interface';
import { UserTimesheetListFacade } from './user-timesheet-list.facade';
import { UserTimesheetListProviders } from './user-timesheet-list.state';

interface ViewModel { 
  timesheets: Timesheet[];
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

  timesheets$: Observable<Timesheet[]> = this.facade.timesheets$;

  constructor(
    private facade: UserTimesheetListFacade,
    private route: ActivatedRoute,
    private router: Router,
    private formService: FormService,
    private chipsFactory: ChipsFactoryService,
    private modelFormService: ModelFormService
  ) {}
  
  openTimesheetForm = (entityId?: string, initialValue?: TimesheetForm): void => {
    let dynamicForm: DynamicForm<TimesheetForm, SaveModelFormState<Partial<ModelState>>>;
    if(!entityId) dynamicForm = {...CreateUserTimesheetForm, disabledControls: _objectToDisabledObjectMap(initialValue)}
    else dynamicForm = EditUserTimesheetForm

    this.modelFormService.open<TimesheetForm>({
      formConfig:{
        dynamicForm: {...dynamicForm, initialValue}, entityId,
        adapter: UserTimesheetFormToSaveModelAdapter, 
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

  private getTopNavConfig = (criteria: TimesheetCriteria): MainTopNavConfig => {
    let activeCriteriaCount = _getSetPropCount(criteria, {dateRangePreset:null})
    return {
      title:  "Timeliste", 
      backFn: this.onBack,     
      buttons: [{
        icon: 'filter_list', 
        callback: this.openTimesheetFilter,
        color: (activeCriteriaCount && activeCriteriaCount > 0) ? "accent" : null
      }],
    }
  }
  
  private resetCriteriaProp(prop: string, criteria: TimesheetCriteria){
    criteria[prop] = null;
    this.facade.updateCriteria(criteria);
  }
}
