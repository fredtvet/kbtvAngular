import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { DeviceInfoService } from '@core/services/device-info.service';
import { ModelState } from "@core/state/model-state.interface";
import { UserTimesheetCardDialogWrapperComponent } from "@shared-timesheet/components/user-timesheet-card-dialog-wrapper.component";
import { WeekCriteria } from '@shared-timesheet/interfaces';
import { AppButton } from "@shared/components/app-button/app-button.interface";
import { MainTopNavConfig } from '@shared/components/main-top-nav-bar/main-top-nav.config';
import { BottomIconButtons } from "@shared/constants/bottom-icon-buttons.const";
import { CreateUserTimesheetModelForm, EditUserTimesheetModelForm, TimesheetForm } from '@shared-timesheet/forms/save-user-timesheet-model-form.const';
import { _getDateOfWeek, _getWeekRange } from 'date-time-helpers';
import { FormService } from "form-sheet";
import { Maybe } from "global-types";
import { ModelFormService } from 'model/form';
import { combineLatest, Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { UserTimesheetListCriteriaQueryParam } from "../../user-timesheet-list/user-timesheet-list/user-timesheet-list-route-params.const";
import { UserTimesheetWeekProviders } from './user-timesheet-week-providers.const';
import { UserTimesheetWeekFacade } from './user-timesheet-week.facade';
import { ViewModel } from './view-model.interface';
import { WeekCriteriaForm } from "@shared-timesheet/forms/week-criteria-controls.const";

@Component({
  selector: "app-user-timesheet-week",
  templateUrl: "./user-timesheet-week.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: UserTimesheetWeekProviders
})
export class UserTimesheetWeekComponent {

  navConfig$: Observable<MainTopNavConfig> = 
    this.facade.weekCriteria$.pipe(map(x => this.getNavConfig(x)));

  vm$: Observable<ViewModel> = combineLatest([
    this.facade.weekDaySummaries$,
    this.deviceInfoService.isXs$
  ]).pipe(
    map(([weekDaySummaries, isXs]) => { return { 
      numberOfWeekDays: isXs ? 5 : 7, 
      weekDaySummaries, weekCriteria: this.facade.weekCriteria
    }}),
  );

  bottomActions: AppButton[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private deviceInfoService: DeviceInfoService,
    private facade: UserTimesheetWeekFacade,
    private modelFormService: ModelFormService<ModelState>,
    private formService: FormService,
  ) {
    this.bottomActions = [  
      {...BottomIconButtons.Filter, callback: this.openWeekFilter},
      {icon: "list", text: "Timeliste", aria: "Timeliste", callback: this.goToTimesheetList},
    ]
  }

  nextWeek = (): void => this.facade.nextWeek()

  previousWeek = (): void => this.facade.previousWeek()

  openTimesheetForm = (entityId?: Maybe<string>, initialValue?: Partial<TimesheetForm>): void => {
    this.modelFormService.open(
      entityId ? EditUserTimesheetModelForm : 
        {...CreateUserTimesheetModelForm, 
          dynamicForm: {...CreateUserTimesheetModelForm.dynamicForm, initialValue}
        },
      entityId
    )
  };

  openTimesheetCard = (timesheetId: string) =>
    this.dialog.open(UserTimesheetCardDialogWrapperComponent, {
      data: timesheetId, panelClass: 'extended-dialog'});

  private goToTimesheetList = () => {
      const {weekNr, year} = this.facade.weekCriteria || {};
      this.router.navigate(["liste", { 
        [UserTimesheetListCriteriaQueryParam]: (weekNr && year) ? JSON.stringify({
            dateRange:  _getWeekRange(_getDateOfWeek(weekNr, year))
        }) : null
      }], {relativeTo: this.route});
  };

  private openWeekFilter = (): void => { 
    this.formService.open({
      formConfig: {...WeekCriteriaForm, 
        options: { noRenderDisabledControls: true } ,
        disabledControls: {user: true}, 
        initialValue: this.facade.weekCriteria 
      }, 
      navConfig: {title: "Velg filtre"},
      submitCallback: (val) => this.facade.updateCriteria(val)
    });
  }

  private getNavConfig(weekCriteria: Maybe<Partial<WeekCriteria>>): MainTopNavConfig{
    return { 
      title:  "Uke " + weekCriteria?.weekNr || "",
      subTitle: weekCriteria?.year?.toString() || "",
    }
  }
}
