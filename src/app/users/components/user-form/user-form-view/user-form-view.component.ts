import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { User, Employer } from 'src/app/shared/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Roles } from 'src/app/shared/enums';

@Component({
  selector: 'app-user-form-view',
  templateUrl: './user-form-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserFormViewComponent implements OnInit {
  Roles = Roles;
  @Input() user: User;
  @Input() employers: Employer[];
  @Input() roles: any;
  @Output() formSubmitted = new EventEmitter();

  isCreateForm = false;
  userForm: FormGroup;

  hidePassword = true;

  constructor(
    private _formBuilder: FormBuilder,) {  }

    ngOnInit(){
      if(this.user == undefined || this.user.userName == undefined){
        this.isCreateForm = true;
        this.user = new User();
      }
      this.initalizeForm();
    }

    initalizeForm(){
      console.log(this.user);
      this.userForm = this._formBuilder.group({
        userName: [{value: this.user.userName, disabled: !this.isCreateForm}, [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.-]*$'),
          Validators.minLength(4),
          Validators.maxLength(100)
        ]],
        password: [{value: null, disabled: !this.isCreateForm},[
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(100)
        ]],
        firstName: [this.user.firstName, [
          Validators.required,
          Validators.maxLength(100)
        ]],
        lastName: [this.user.lastName, [
          Validators.required,
          Validators.maxLength(100)
        ]],
        phoneNumber: [this.user.phoneNumber, [
          Validators.minLength(4),
          Validators.maxLength(12)
        ]],
        role: [this.user.role, [
          Validators.required
        ]],
        employerId: [this.user.employerId]
      });
    }

    onSubmit(){
      console.log(this.userForm.getRawValue());
      if(this.userForm.valid && this.userForm.dirty) 
        this.formSubmitted.emit(this.userForm.getRawValue());
    }

    changeRole(e){
      this.role.setValue(e.target.value,{onlySelf: true});
    }

    changeEmployerId(e){
      this.employerId.setValue(e.target.value,{onlySelf: true});
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

    get role(){
      return this.userForm.get('role')
    }

    get employerId(){
      return this.userForm.get('employerId')
    }
}
