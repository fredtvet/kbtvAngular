import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-mail-entity-form',
  templateUrl: './mail-entity-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MailEntityFormComponent implements OnInit {
  @Input() toEmailPreset: string;
  @Output() formSubmitted = new EventEmitter();

  mailEntityForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(){
    this.mailEntityForm = this._formBuilder.group({
      toEmail: [this.toEmailPreset, [
        Validators.required,
        Validators.email
      ]],
    });
  }

  onSubmit(){
    const {value, valid} = this.mailEntityForm;
    if(valid) this.formSubmitted.emit(this.toEmail.value);
  }

  get toEmail(){
    return this.mailEntityForm.get('toEmail')
  }

}
