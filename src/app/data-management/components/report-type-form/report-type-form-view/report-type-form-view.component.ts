import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-report-type-form-view',
  templateUrl: './report-type-form-view.component.html'
})
export class ReportTypeFormViewComponent implements OnInit {

  @Output() formSubmitted = new EventEmitter();

  reportTypeForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(){
    this.initalizeForm();
  }

  initalizeForm(){
    this.reportTypeForm = this._formBuilder.group({
      name: [null, [
        Validators.required,
        Validators.maxLength(45)
      ]],
    });
  }

  onSubmit(){
    const {value, valid} = this.reportTypeForm;
    if(valid && this.reportTypeForm.dirty) this.formSubmitted.emit(value);
  }

  get name(){
    return this.reportTypeForm.get('name')
  }

}
