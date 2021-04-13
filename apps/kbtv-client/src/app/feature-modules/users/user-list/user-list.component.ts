import { ChangeDetectionStrategy, Component } from '@angular/core';
import { User } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { ButtonTypes } from '@shared-app/enums/button-types.enum';
import { _trackByModel } from '@shared-app/helpers/trackby/track-by-model.helper';
import { AppButton } from '@shared/components/app-button/app-button.interface';
import { UserPasswordForm } from '@shared/constants/forms/password-form.const';
import { CreateUserForm, EditUserForm, UserForm } from '@shared/constants/model-forms/save-user-forms.const';
import { FormService } from 'form-sheet';
import { ModelFormService } from 'model-form';
import { Observable } from 'rxjs';
import { Maybe } from 'global-types';
import { UsersFacade } from '../users.facade';
import { DeviceInfoService } from '@core/services/device-info.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {
  ButtonTypes = ButtonTypes;

  users$: Observable<Maybe<User[]>> = this.facade.sortedUsers$;

  actionFab: AppButton;

  isOnline$ = this.deviceInfoService.isOnline$;

  constructor(
    private facade: UsersFacade,
    private modelFormService: ModelFormService,
    private deviceInfoService: DeviceInfoService,
    private formService: FormService) {    
      this.facade.fetchUsers();
      this.actionFab = {
        icon: "add", 
        aria: 'Ny bruker',
        color: 'accent',
        callback: this.openUserForm
      };
    }

  trackByUser = _trackByModel("users")

  getEditButton(userName: string): AppButton {
    return {
      icon: 'edit', 
      callback: () => this.openUserForm(userName),
      type: ButtonTypes.Icon
    } 
  }

  getNewPasswordButton(userName: string): AppButton {
    return {
      icon: 'vpn_key', 
      color: 'accent',
      callback: () => this.openNewPasswordForm(userName),
      type: ButtonTypes.Icon
    }
  }

  private openUserForm = (userName?: string): void => {
    this.modelFormService.open<ModelState, UserForm>({formConfig: {
      entityId: userName, 
      stateProp: "users", 
      dynamicForm: userName ? EditUserForm : CreateUserForm,
    }});
  }
  
  private openNewPasswordForm = (userName?: string): void => {
    this.formService.open<UserPasswordForm>({
      formConfig: {...UserPasswordForm, initialValue: {userName}}, 
      navConfig: {title: "Oppdater passord"},  
      submitCallback: (val: UserPasswordForm) => this.facade.updatePassword(val.userName, val.newPassword)
    });
  }

}