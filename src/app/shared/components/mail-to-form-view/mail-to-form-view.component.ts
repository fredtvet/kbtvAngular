import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-mail-to-form-view',
  templateUrl: './mail-to-form-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MailToFormViewComponent implements OnInit {
  @Input() toEmailPreset: string;
  @Output() formSubmitted = new EventEmitter();

  mailToForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(){
    this.mailToForm = this._formBuilder.group({
      toEmail: [this.toEmailPreset, [
        Validators.required,
        Validators.email
      ]],
    });
  }

  onSubmit(){
    const {value, valid} = this.mailToForm;
    if(valid) this.formSubmitted.emit(this.toEmail.value);
  }

  get toEmail(){
    return this.mailToForm.get('toEmail')
  }

}
