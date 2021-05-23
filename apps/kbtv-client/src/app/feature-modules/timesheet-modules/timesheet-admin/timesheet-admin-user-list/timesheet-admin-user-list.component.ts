import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@core/models';
import { _trackByModel } from '@shared-app/helpers/trackby/track-by-model.helper';
import { LeaderSettingsFormSheet } from '@shared-timesheet/forms/leader-settings-form.const';
import { AppButton } from '@shared/components/app-button/app-button.interface';
import { MainTopNavConfig } from '@shared/components/main-top-nav-bar/main-top-nav.config';
import { BottomIconButtons } from '@shared/constants/bottom-icon-buttons.const';
import { FormService } from 'form-sheet';
import { TimesheetAdminWeekListCriteriaQueryParam } from '../timesheet-admin-week-list/timesheet-admin-week-list-route-params.const';
import { TimesheetAdminFacade } from '../timesheet-admin.facade';

@Component({
  selector: 'app-timesheet-admin-user-list',
  templateUrl: './timesheet-admin-user-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimesheetAdminUserListComponent {

  users$ = this.facade.users$;

  navConfig: MainTopNavConfig = {title: 'Administrer timer'};

  bottomActions: AppButton[];

  actionFab: AppButton = { 
    icon: "add", aria: 'Legg til', 
    callback: () => this.facade.openTimesheetForm() 
  }

  constructor(
    private facade: TimesheetAdminFacade,
    private formService: FormService,
    private router: Router
  ) {
    this.bottomActions = [{...BottomIconButtons.Settings, callback: this.openLeaderSettingsForm}];
  }

  goToWeekList(user: User){
    this.router.navigate(['timeadministrering/uker', {
      [TimesheetAdminWeekListCriteriaQueryParam]: JSON.stringify({user, year: new Date().getFullYear()})
    }])
  }

  openLeaderSettingsForm = () =>
    this.formService.open(
      LeaderSettingsFormSheet, 
      { initialValue: this.facade.leaderSettings },
      (val) => this.facade.updateLeaderSettings(val)
    )
  
  trackByUser = _trackByModel("users");
}
