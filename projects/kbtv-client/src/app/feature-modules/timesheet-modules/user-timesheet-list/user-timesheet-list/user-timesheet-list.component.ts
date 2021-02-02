import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from '@angular/router';
import { Timesheet } from '@core/models';
import { ChipsFactoryService } from '@core/services/ui/chips-factory.service';
import { ModelState } from '@core/state/model-state.interface';
import { AppButton } from "@shared-app/interfaces/app-button.interface";
import { AppChip } from '@shared-app/interfaces/app-chip.interface';
import { UserTimesheetCardDialogWrapperComponent } from "@shared-timesheet/components/user-timesheet-card-dialog-wrapper.component";
import { MainTopNavConfig } from '@shared/components/main-top-nav-bar/main-top-nav.config';
import { TimesheetCriteriaForm, TimesheetCriteriaFormState } from '@shared/constants/forms/timesheet-criteria-form.const';
import { CreateUserTimesheetForm, EditUserTimesheetForm, TimesheetForm } from '@shared/constants/model-forms/save-user-timesheet-form.const';
import { DynamicForm, _disableControlsWithNoValue } from 'dynamic-forms';
import { FormService, OptionsFormState } from 'form-sheet';
import { Immutable, ImmutableArray, Maybe, Prop } from 'global-types';
import { ModelFormService } from 'model-form';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { TimesheetCriteriaChipOptions } from '../../shared-timesheet/timesheet-filter/timesheet-criteria-chip-options.const';
import { TimesheetCriteria } from '../../shared-timesheet/timesheet-filter/timesheet-criteria.interface';
import { UserTimesheetListFacade } from './user-timesheet-list.facade';
import { UserTimesheetListProviders } from './user-timesheet-list.state';

interface ViewModel { 
  timesheets: ImmutableArray<Timesheet>;
  criteriaChips: AppChip[], 
}

@Component({
  selector: "app-user-timesheet-list",
  templateUrl: "./user-timesheet-list.component.html",
  providers: UserTimesheetListProviders,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTimesheetListComponent {

  criteriaChips$: Observable<AppChip[]> = this.facade.criteria$.pipe(
    map(criteria =>  this.chipsFactory.createCriteriaChips(criteria, 
      (prop) => this.resetCriteriaProp(prop, criteria),
      TimesheetCriteriaChipOptions
    ))
  )

  timesheets$ = this.facade.timesheets$;

  bottomActions: AppButton[];

  navConfig: MainTopNavConfig;

  actionFab: AppButton = { 
    icon: "add", aria: 'Legg til', 
    callback: () => this.openTimesheetForm(undefined, <TimesheetForm> this.facade.criteria) 
  }

  constructor(
    private facade: UserTimesheetListFacade,
    private route: ActivatedRoute,
    private router: Router,
    private formService: FormService,
    private dialog: MatDialog,
    private chipsFactory: ChipsFactoryService,
    private modelFormService: ModelFormService
  ) {
    this.bottomActions = [
      { icon: 'filter_list', 
        callback: this.openTimesheetFilter }
    ]
    this.navConfig = { title:  "Timeliste", backFn: this.onBack }
  }
  
  openTimesheetForm = (entityId?: string, initialValue?: TimesheetForm): void => {
    let dynamicForm: DynamicForm<TimesheetForm, OptionsFormState<Partial<ModelState>>>;
    if(!entityId) dynamicForm = {...CreateUserTimesheetForm, disabledControls: _disableControlsWithNoValue(initialValue)}
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

  openTimesheetCard = (timesheetId: string) =>
    this.dialog.open(UserTimesheetCardDialogWrapperComponent, {
      data: timesheetId, panelClass: 'extended-dialog'});

  private onBack = (): void => {
    this.router.navigate(['../'], { relativeTo: this.route.parent })
  }

  private resetCriteriaProp(prop: Prop<Immutable<TimesheetCriteria>>, criteria: Maybe<Immutable<TimesheetCriteria>>){
    const clone = {...criteria || {}};
    clone[prop] = undefined;
    this.facade.updateCriteria(clone);
  }
}
