import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-form-view',
  templateUrl: './password-form-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordFormViewComponent implements OnInit {

  @Output() formSubmitted = new EventEmitter();
    
  error: string;
  passwordForm: FormGroup;
  hidePasswords = {curr: true, new: true, confirm: true}

  constructor(private _formBuilder: FormBuilder) { }

    ngOnInit(){
      this.initalizeForm();
    }

    initalizeForm(){
      this.passwordForm = this._formBuilder.group({
        oldPassword: ['', [Validators.required, Validators.minLength(7)]],
        password: ['', [Validators.required, Validators.minLength(7)]],
        confirmPassword: ['', Validators.required],
      });
    }

    onSubmit(){
      const {value, valid} = this.passwordForm;

      if(valid && this.password.value === this.confirmPassword.value)
      {
        this.formSubmitted.emit(value);
        this.passwordForm.reset();
      }
      else if (this.password.value !== this.confirmPassword.value)
        this.error = "Passordene er ikke like";
    }

    get oldPassword(){
      return this.passwordForm.get('oldPassword')
    }

    get password(){
      return this.passwordForm.get('password')
    }

    get confirmPassword(){
      return this.passwordForm.get('confirmPassword');
    }

}
