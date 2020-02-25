import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-report-type-form-dialog',
  templateUrl: './report-type-form-dialog.component.html'
})
export class ReportTypeFormDialogComponent implements OnInit {

  reportTypeForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ReportTypeFormDialogComponent>) {}

  ngOnInit(){
    this.initalizeForm();
  }

  initalizeForm(){
    this.reportTypeForm = this._formBuilder.group({
      name: [null, [
        Validators.required,
        Validators.maxLength(45)
      ]]
    });
  }

  onSubmit(){
    const {value, valid} = this.reportTypeForm;

    if(valid && this.reportTypeForm.dirty) this.dialogRef.close(value);
  }

  get name(){
    return this.reportTypeForm.get('name')
  }

}
