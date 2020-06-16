import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-password-form-view',
  templateUrl: './new-password-form-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewPasswordFormViewComponent implements OnInit {

  constructor(
    private _formBuilder: FormBuilder) { }

    @Input() error: string;
    @Input() userName: string;
    @Output() formSubmitted = new EventEmitter();

    passwordForm: FormGroup;
    hidePasswords = {new: true, confirm: true}

    ngOnInit(){
      this.initalizeForm();
    }

    initalizeForm(){
      this.passwordForm = this._formBuilder.group({
        userName:  { value: this.userName, disabled: true },
        newPassword: ['', [Validators.required, Validators.minLength(7)]],    
        confirmPassword: ['', [Validators.required, Validators.minLength(7)]],
      });
    }


    onSubmit(){
      const {value, valid} = this.passwordForm;

      if(valid && this.newPassword.value === this.confirmPassword.value)
      {
        this.formSubmitted.emit(value);
        this.passwordForm.reset();
      }
      else if (this.newPassword.value !== this.confirmPassword.value)
        this.error = "Passordene er ikke like";
    }


    get newPassword(){
      return this.passwordForm.get('newPassword')
    }

    get confirmPassword(){
      return this.passwordForm.get('confirmPassword');
    }

}
