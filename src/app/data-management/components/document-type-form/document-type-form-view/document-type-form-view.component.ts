import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-document-type-form-view',
  templateUrl: './document-type-form-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentTypeFormViewComponent implements OnInit {

  @Output() formSubmitted = new EventEmitter();

  documentTypeForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(){
    this.initalizeForm();
  }

  initalizeForm(){
    this.documentTypeForm = this._formBuilder.group({
      name: [null, [
        Validators.required,
        Validators.maxLength(45)
      ]],
    });
  }

  onSubmit(){
    const {value, valid} = this.documentTypeForm;
    if(valid && this.documentTypeForm.dirty) this.formSubmitted.emit(value);
  }

  get name(){
    return this.documentTypeForm.get('name')
  }

}
