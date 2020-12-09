import { ChangeDetectionStrategy, Component } from '@angular/core';
import { User } from '@core/models';
import { ButtonTypes, Roles } from '@shared-app/enums';
import { _trackByModel } from '@shared-app/helpers/trackby/track-by-model.helper';
import { MainTopNavConfig } from '@shared/components/main-top-nav-bar/main-top-nav.config';
import { UserPasswordForm, UserPasswordFormState } from '@shared/constants/forms/password-form.const';
import { CreateUserForm, EditUserForm, UserForm } from '@shared/constants/model-forms/save-user-forms.const';
import { FormService } from '@shared/form';
import { ModelFormService } from '@shared/model-form';
import { Observable } from 'rxjs';
import { UsersFacade } from '../users.facade';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {
  Roles = Roles;
  ButtonTypes = ButtonTypes;

  users$: Observable<User[]> = this.facade.sortedUsers$;
  navConfig: MainTopNavConfig;

  constructor(
    private facade: UsersFacade,
    private modelFormService: ModelFormService,
    private formService: FormService) {
      this.navConfig = {
        title:  "Brukere",
        buttons: [{
          icon: "person_add", 
          aria: 'Ny bruker',
          callback: this.openUserForm, 
          allowedRoles: [Roles.Leder]
        }]
      };
    }

  openUserForm = (userName?: string): void => {
    this.modelFormService.open<UserForm>({formConfig: {
      entityId: userName, 
      stateProp: "users", 
      dynamicForm: userName ? EditUserForm : CreateUserForm,
    }});
  }
  
  openNewPasswordForm = (userName?: string): void => {
    this.formService.open<UserPasswordFormState, any>({
      formConfig: {...UserPasswordForm, initialValue: {userName}}, 
      navConfig: {title: "Oppdater passord"},  
      submitCallback: (val: UserPasswordFormState) => this.facade.updatePassword(val.userName, val.newPassword)
    });
  }

  trackByUser = _trackByModel("users")

}
