import { Component, OnInit, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-mission-type-form-view',
  templateUrl: './mission-type-form-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionTypeFormViewComponent implements OnInit {
  
  @Output() formSubmitted = new EventEmitter();

  missionTypeForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(){
    this.initalizeForm();
  }

  initalizeForm(){
    this.missionTypeForm = this._formBuilder.group({
      name: [null, [
        Validators.required,
        Validators.maxLength(45)
      ]],
    });
  }

  onSubmit(){
    const {value, valid} = this.missionTypeForm;
    if(valid && this.missionTypeForm.dirty) this.formSubmitted.emit(value);
  }

  get name(){
    return this.missionTypeForm.get('name')
  }

}
