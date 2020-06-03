import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Credentials } from 'src/app/shared/interfaces/credentials.interface';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginFormComponent {
  @Output() submitted = new EventEmitter<Credentials>();
  authForm: FormGroup;
  hidePassword = true;
  
  constructor(
    private fb: FormBuilder
  ) {
    this.authForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submitForm = () => {
    const {value, valid} = this.authForm
    if(valid) this.submitted.emit(value)
  };

  get userName() {
    return this.authForm.get('userName');
  }

  get password() {
    return this.authForm.get('password');
  }
}