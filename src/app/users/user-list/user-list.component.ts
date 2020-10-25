import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models';
import { FormService } from 'src/app/core/services/form/form.service';
import { ModelFormService } from 'src/app/core/services/model/model-form.service';
import { ButtonTypes, Roles } from 'src/app/shared-app/enums';
import { MainTopNavConfig } from 'src/app/shared/components/main-top-nav-bar/main-top-nav.config';
import { UserPasswordForm, UserPasswordFormState } from 'src/app/shared/forms/password-form.const';
import { SaveModelFormState } from 'src/app/shared/model-form/interfaces';
import { CreateUserForm, EditUserForm, UserForm } from 'src/app/shared/model-forms/save-user-forms.const';
import { _trackByModel } from 'src/app/shared/trackby/track-by-model.helper';
import { UserFormToSaveModelAdapter } from '../save-user/user-form-to-save-model.adapter';
import { UsersStore } from '../users.store';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {
  Roles = Roles;
  ButtonTypes = ButtonTypes;

  users$: Observable<User[]> = this.store.sortedUsers$;
  navConfig: MainTopNavConfig;

  constructor(
    private store: UsersStore,
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
    this.modelFormService.open<UserForm, SaveModelFormState>({formConfig: {
      entityId: userName, 
      stateProp: "users", 
      dynamicForm: userName ? EditUserForm : CreateUserForm,
      adapter: UserFormToSaveModelAdapter,
    }});
  }
  
  openNewPasswordForm = (userName?: string): void => {
    this.formService.open<UserPasswordFormState, any>({
      formConfig: {...UserPasswordForm, initialValue: {userName}}, 
      navConfig: {title: "Oppdater passord"},  
      submitCallback: (val: UserPasswordFormState) => this.store.updatePassword(val.userName, val.newPassword)
    });
  }

  trackByUser = _trackByModel("users")

}
