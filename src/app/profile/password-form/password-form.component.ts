import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html'
})
export class PasswordFormComponent implements OnInit {

  constructor(
    private _formBuilder: FormBuilder) { }

    @Input() error: string;
    @Output() passwordUpdated = new EventEmitter();

    passwordForm: FormGroup;
    hidePasswords = {curr: true, new: true, confirm: true}

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
        this.passwordUpdated.emit(value);
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
