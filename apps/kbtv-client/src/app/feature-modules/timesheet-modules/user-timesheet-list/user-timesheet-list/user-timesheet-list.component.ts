import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from '@angular/router';
import { ChipsFactoryService } from '@core/services/ui/chips-factory.service';
import { ModelState } from "@core/state/model-state.interface";
import { AppChip } from '@shared-app/interfaces/app-chip.interface';
import { UserTimesheetCardDialogWrapperComponent } from "@shared-timesheet/components/user-timesheet-card-dialog-wrapper.component";
import { UserTimesheetCriteriaFormSheet } from "@shared-timesheet/timesheet-criteria-form-service";
import { AppButton } from "@shared/components/app-button/app-button.interface";
import { MainTopNavConfig } from '@shared/components/main-top-nav-bar/main-top-nav.config';
import { BottomIconButtons } from "@shared/constants/bottom-icon-buttons.const";
import { CreateUserTimesheetModelForm, EditUserTimesheetModelForm, TimesheetForm, TimesheetFormState, UserTimesheetForm } from '@shared-timesheet/forms/save-timesheet-model-forms.const';
import { Immutable, Maybe, Prop, UnknownState } from 'global-types';
import { ModelFormService } from 'model/form';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { TimesheetCriteriaChipOptions } from '../../shared-timesheet/timesheet-filter/timesheet-criteria-chip-options.const';
import { TimesheetCriteria } from '../../shared-timesheet/timesheet-filter/timesheet-criteria.interface';
import { UserTimesheetListProviders } from "./state/user-timesheet-list.providers";
import { UserTimesheetListFacade } from './user-timesheet-list.facade';
import { UserTimesheet } from "@core/models";

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
    callback: () => this.openTimesheetForm(undefined, <Immutable<Partial<TimesheetForm>>> this.facade.criteria) 
  }

  constructor(
    private facade: UserTimesheetListFacade,
    private route: ActivatedRoute,
    private router: Router,
    private criteriaFormService: UserTimesheetCriteriaFormSheet,
    private dialog: MatDialog,
    private chipsFactory: ChipsFactoryService,
    private modelFormService: ModelFormService<ModelState>
  ) {
    this.bottomActions = [
      { ...BottomIconButtons.Filter,
        callback: this.openTimesheetFilter }
    ]
    this.navConfig = { title:  "Timeliste", backFn: this.onBack }
  }

  
  openTimesheetForm = (entityId?: Maybe<string>, initialValue?: Immutable<Partial<TimesheetForm>>): void => {
    this.modelFormService.open<UserTimesheet, UserTimesheetForm, TimesheetFormState>(
      entityId ? EditUserTimesheetModelForm : CreateUserTimesheetModelForm,
      initialValue || {id: <string> entityId},
    )
  };

  openTimesheetFilter = (): void => {
    this.criteriaFormService.open((val) => this.facade.updateCriteria(val))
  }

  openTimesheetCard = (timesheetId: string) =>
    this.dialog.open(UserTimesheetCardDialogWrapperComponent, {
      data: timesheetId, panelClass: 'extended-dialog'});

  private onBack = (): void => {
    this.router.navigate(['../'], { relativeTo: this.route.parent })
  }

  private resetCriteriaProp(prop: Prop<Immutable<Partial<TimesheetCriteria>>>, criteria: Maybe<Immutable<TimesheetCriteria>>){
    const clone = <UnknownState>{...criteria || {}};
    clone[prop] = undefined;
    this.facade.updateCriteria(<Immutable<TimesheetCriteria>> clone);
  }
}
