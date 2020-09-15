import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseModelFormViewComponent } from 'src/app/core/model/form';
import { User } from 'src/app/core/models';
import { Roles } from 'src/app/shared-app/enums';
import { isUniqueValidator } from 'src/app/shared/validators/is-unique.validator';
import { SaveUserCommand } from './save-user-command.interface';
import { UserForm, UserFormViewConfig } from './user-form-view-config.interface';

@Component({
  selector: 'app-user-form-view',
  templateUrl: './user-form-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserFormViewComponent extends BaseModelFormViewComponent<UserForm, User, UserFormViewConfig, SaveUserCommand> {
    Roles = Roles;
    
    roles: string[] = Object.keys(Roles).map(key => Roles[key] as string);

    hidePassword = true;

    constructor(private _formBuilder: FormBuilder) { super(); }

    protected _initalizeForm(cfg: UserFormViewConfig){
      return this._formBuilder.group({
        userName: [{value: cfg?.entity?.userName, disabled: !this.isCreateForm}, [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.-]*$'),
          Validators.minLength(4),
          Validators.maxLength(100),
          isUniqueValidator(this.config.users, "userName")
        ]],
        password: [{value: null, disabled: !this.isCreateForm},[
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(100)
        ]],
        firstName: [cfg?.entity?.firstName, [
          Validators.required,
          Validators.maxLength(100)
        ]],
        lastName: [cfg?.entity?.lastName, [
          Validators.required,
          Validators.maxLength(100)
        ]],
        phoneNumber: [cfg?.entity?.phoneNumber, [
          Validators.minLength(4),
          Validators.maxLength(12)
        ]],
        email: [cfg?.entity?.email, [
          Validators.email
        ]],
        role: [cfg?.entity?.role, [
          Validators.required, 
        ]],
        employerId: [cfg?.entity?.employerId]
      });
    }

    changeRole(e){
      this.role.setValue(e.target.value,{onlySelf: true});
    }

    changeEmployerId(e){
      this.employerId.setValue(e.target.value,{onlySelf: true});
    }

    get userName(){
      return this.form.get('userName')
    }

    get password(){
      return this.form.get('password')
    }

    get firstName(){
      return this.form.get('firstName');
    }

    get lastName(){
      return this.form.get('lastName')
    }

    get phoneNumber(){
      return this.form.get('phoneNumber')
    }

    get email(){
      return this.form.get('email')
    }

    get role(){
      return this.form.get('role')
    }

    get employerId(){
      return this.form.get('employerId')
    }
}
