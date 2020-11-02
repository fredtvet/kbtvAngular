import { Directive } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModelState } from 'src/app/core/services/model/interfaces';
import { ChipsFactoryService } from 'src/app/core/services/ui/chips-factory.service';
import { _objectToDisabledObjectMap } from 'src/app/dynamic-forms/helpers/disabled-control-map.helper';
import { DynamicForm } from 'src/app/dynamic-forms/interfaces';
import { DateRangePresets } from 'src/app/shared-app/enums';
import { _getSetPropCount } from 'src/app/shared-app/helpers/object/get-set-prop-count.helper';
import { MainTopNavConfig } from 'src/app/shared/components/main-top-nav-bar/main-top-nav.config';
import { TimesheetCriteriaForm, TimesheetCriteriaFormState } from 'src/app/shared/constants/forms/timesheet-criteria-form.const';
import { CreateUserTimesheetForm, EditUserTimesheetForm, TimesheetForm } from 'src/app/shared/constants/model-forms/save-user-timesheet-form.const';
import { FormService } from 'src/app/shared/form';
import { ModelFormService, SaveModelFormState } from 'src/app/shared/model-form';
import { UserTimesheetFormToSaveModelAdapter } from '../../shared-timesheet/save-user-timesheet/user-timesheet-form-to-save-model.adapter';
import { UserTimesheetStore } from '../../shared-timesheet/services/user-timesheet.store';
import { TimesheetCriteriaChipOptions } from '../../shared-timesheet/timesheet-filter/timesheet-criteria-chip-options.const';
import { TimesheetCriteria } from '../../shared-timesheet/timesheet-filter/timesheet-criteria.interface';
import { UserTimesheetListViewModel } from './user-timesheet-list-view-model.interface';

@Directive()
export class UserTimesheetListFacade {

    private navView$: Observable<Partial<UserTimesheetListViewModel>> = this.store.criteria$.pipe(
        map(criteria => { return {
          navConfig: this.getTopNavConfig(criteria),
          fabs: [
            {icon: "add", aria: 'Legg til', color: 'accent', 
              callback: this.openTimesheetForm,
              params: [null, {mission: criteria?.mission}]}
          ],
          chips: this.chipsFactory.createCriteriaChips(criteria, 
              (prop) => this.resetCriteriaProp(prop, criteria),
              TimesheetCriteriaChipOptions
            )
        }})
      )
    
      vm$: Observable<UserTimesheetListViewModel> = combineLatest([this.store.filteredTimesheets$, this.navView$]).pipe(
        map(([filtered, vm]) => { return {...vm, timesheets: filtered.records}})
      );
    
      constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formService: FormService,
        private store: UserTimesheetStore,
        private chipsFactory: ChipsFactoryService,
        private modelFormService: ModelFormService
      ) {
        let filter = this.route.snapshot.params.filter;
    
        const criteria: TimesheetCriteria = filter ? JSON.parse(filter) : {};
        
        if(criteria.dateRange && !criteria.dateRangePreset) 
          criteria.dateRangePreset = DateRangePresets.Custom
    
        this.store.addFilterCriteria(criteria);
      }
    
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
            initialValue: this.store.criteria}, 
          formState: this.store.timesheetCriteriaFormState$,
          navConfig: {title: "Velg filtre"},
          submitCallback: (val: TimesheetCriteria) => this.store.addFilterCriteria(val)
        });
      }
    
      private onBack = (): void => {
        this.router.navigate(['../'],{ relativeTo: this.route.parent })
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
        this.store.addFilterCriteria(criteria);
      }
    
}