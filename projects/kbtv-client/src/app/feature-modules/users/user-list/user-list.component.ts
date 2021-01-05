import { ChangeDetectionStrategy, Component } from '@angular/core';
import { User } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { FormService } from 'form-sheet';
import { ModelFormService } from 'model-form';
import { _trackByModel } from '@shared-app/helpers/trackby/track-by-model.helper';
import { MainTopNavConfig } from '@shared/components/main-top-nav-bar/main-top-nav.config';
import { UserPasswordForm } from '@shared/constants/forms/password-form.const';
import { CreateUserForm, EditUserForm, UserForm } from '@shared/constants/model-forms/save-user-forms.const';
import { Observable } from 'rxjs';
import { UsersFacade } from '../users.facade';
import { ButtonTypes } from '@shared-app/enums/button-types.enum';
import { Roles } from '@shared-app/enums/roles.enum';

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
    this.modelFormService.open<ModelState, UserForm>({formConfig: {
      entityId: userName, 
      stateProp: "users", 
      dynamicForm: userName ? EditUserForm : CreateUserForm,
    }});
  }
  
  openNewPasswordForm = (userName?: string): void => {
    this.formService.open<UserPasswordForm>({
      formConfig: {...UserPasswordForm, initialValue: {userName}}, 
      navConfig: {title: "Oppdater passord"},  
      submitCallback: (val: UserPasswordForm) => this.facade.updatePassword(val.userName, val.newPassword)
    });
  }

  trackByUser = _trackByModel("users")

}
