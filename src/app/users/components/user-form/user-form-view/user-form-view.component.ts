import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { User, Employer } from 'src/app/core/models';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Roles } from 'src/app/shared-app/enums';

@Component({
  selector: 'app-user-form-view',
  templateUrl: './user-form-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserFormViewComponent implements OnInit {
  Roles = Roles;
  @Input() users: User[];
  @Input() userNamePreset: string;
  @Input() employers: Employer[];
  @Input() roles: any;
  @Output() formSubmitted = new EventEmitter();

  isCreateForm = false;
  userForm: FormGroup;

  hidePassword = true;

  constructor(
    private _formBuilder: FormBuilder,) {  }

    ngOnInit(){
      let user;

      if(this.users && this.users !== null)
        user = this.users.find(x => x.userName === this.userNamePreset);   
   
      if(!user) this.isCreateForm = true;

      this.initalizeForm(user);
    }

    private initalizeForm(x: User){
      this.userForm = this._formBuilder.group({
        userName: [{value: x ? x.userName : null, disabled: !this.isCreateForm}, [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.-]*$'),
          Validators.minLength(4),
          Validators.maxLength(100),
          this.uniqueUserNameValidator()
        ]],
        password: [{value: null, disabled: !this.isCreateForm},[
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(100)
        ]],
        firstName: [x ? x.firstName : null, [
          Validators.required,
          Validators.maxLength(100)
        ]],
        lastName: [x ? x.lastName : null, [
          Validators.required,
          Validators.maxLength(100)
        ]],
        phoneNumber: [x ? x.phoneNumber : null, [
          Validators.minLength(4),
          Validators.maxLength(12)
        ]],
        email: [x ? x.email : null, [
          Validators.email
        ]],
        role: [x ? x.role : null, [
          Validators.required, 
        ]],
        employerId: [x ? x.employerId : null]
      });
    }

    onSubmit(){
      if(this.userForm.valid && this.userForm.dirty) 
        this.formSubmitted.emit(this.userForm.getRawValue());
    }

    changeRole(e){
      this.role.setValue(e.target.value,{onlySelf: true});
    }

    changeEmployerId(e){
      this.employerId.setValue(e.target.value,{onlySelf: true});
    }

    private uniqueUserNameValidator(): ValidatorFn{ 
      return (control: AbstractControl): {[key: string]: any} | null => {
        const invalid = this.users.find(x => x.userName === control.value); 
        return invalid ? {'userNameTaken': {value: control.value}} : null;
      };
    }

    get userName(){
      return this.userForm.get('userName')
    }

    get password(){
      return this.userForm.get('password')
    }

    get firstName(){
      return this.userForm.get('firstName');
    }

    get lastName(){
      return this.userForm.get('lastName')
    }

    get phoneNumber(){
      return this.userForm.get('phoneNumber')
    }

    get email(){
      return this.userForm.get('email')
    }

    get role(){
      return this.userForm.get('role')
    }

    get employerId(){
      return this.userForm.get('employerId')
    }
}
