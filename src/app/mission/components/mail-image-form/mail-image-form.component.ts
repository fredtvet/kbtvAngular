import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-mail-image-form',
  templateUrl: './mail-image-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MailImageFormComponent implements OnInit {
  @Input() toEmailPreset: string;
  @Output() formSubmitted = new EventEmitter();

  mailImageForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(){
    this.mailImageForm = this._formBuilder.group({
      toEmail: [this.toEmailPreset, [
        Validators.required,
        Validators.email
      ]],
    });
  }

  onSubmit(){
    const {value, valid} = this.mailImageForm;
    if(valid) this.formSubmitted.emit(this.toEmail.value);
  }

  get toEmail(){
    return this.mailImageForm.get('toEmail')
  }

}
