import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-inbound-email-password-form-view',
  templateUrl: './inbound-email-password-form-view.component.html'
})
export class InboundEmailPasswordFormViewComponent implements OnInit {
  
  @Output() formSubmitted = new EventEmitter();

  passwordForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(){
    this.initalizeForm();
  }

  initalizeForm(){
    this.passwordForm = this._formBuilder.group({
      password: [null, [
        Validators.required,
        Validators.maxLength(250)
      ]],
    });
  }

  onSubmit(){
    const {value, valid} = this.passwordForm;
    if(valid) this.formSubmitted.emit(value);
  }

  get password(){
    return this.passwordForm.get('password')
  }
}
