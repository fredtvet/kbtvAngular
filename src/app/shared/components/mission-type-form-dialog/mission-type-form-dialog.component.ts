import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mission-type-form-dialog',
  templateUrl: './mission-type-form-dialog.component.html'
})
export class MissionTypeFormDialogComponent implements OnInit {

  missionTypeForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<MissionTypeFormDialogComponent>) {}

  ngOnInit(){
    this.initalizeForm();
  }

  initalizeForm(){
    this.missionTypeForm = this._formBuilder.group({
      name: [null, [
        Validators.required,
        Validators.maxLength(45)
      ]]
    });
  }

  onSubmit(){
    const {value, valid} = this.missionTypeForm;

    if(valid && this.missionTypeForm.dirty) this.dialogRef.close(value);
  }

  get name(){
    return this.missionTypeForm.get('name')
  }

}
