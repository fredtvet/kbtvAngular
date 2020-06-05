import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Mission, MissionType, Employer } from 'src/app/shared/interfaces/models';
import { Roles } from 'src/app/shared/enums';

@Component({
  selector: 'app-mission-form-view',
  templateUrl: './mission-form-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MissionFormViewComponent implements OnInit {
  Roles = Roles;

  @Input() mission: Mission;
  @Input() missionTypes: MissionType[];
  @Input() employers: Employer[];
  @Output() formSubmitted = new EventEmitter();

  missionForm: FormGroup;

  googleOptions = {
    types: ['geocode'],
    componentRestrictions: { country: "no" }
  }
  
  isStreetAddress = false;

  isCreateForm: boolean = false;

  files: FileList;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(){
    if(!this.mission || this.mission == null) this.isCreateForm = true;
    console.log(this.isCreateForm);
    this.initalizeForm(this.mission);
  }

  initalizeForm(x: Mission){
    this.missionForm = this._formBuilder.group({
      id: x ? x.id : null,
      address: [x ? x.address : null, [
        Validators.required,
        Validators.maxLength(100)
      ]],
      phoneNumber: [x ? x.phoneNumber : null, [
        Validators.minLength(4),
        Validators.maxLength(12)
      ]],
      description: [x ? x.description : null, [
        Validators.maxLength(400)
      ]],
      finished: [x ? x.finished : null]  ,
      deleteCurrentImage: [false],
      employer: this._formBuilder.group({
        id: [null],
        name: [(x && x.employer) ? x.employer.name : null],
      }),
      missionType: this._formBuilder.group({
        id: [null],
        name: [(x && x.missionType) ? x.missionType.name : null],
      })
    });
  }

  onSubmit(){
    let existingType = this.missionTypes.find(x => x.name === this.missionTypeName.value);
    let existingEmployee = this.employers.find(x => x.name === this.employerName.value);

    if(existingType)
      this.missionTypeId.setValue(existingType.id);

    if(existingEmployee)
      this.employerId.setValue(existingEmployee.id);

    const value = {...this.missionForm.value, image: this.files ? this.files[0] : undefined}

    if(this.missionForm.valid && (this.missionForm.dirty || value.image)) 
      this.formSubmitted.emit(value);
  }

  handleAddressChange(googleAddress){
    this.missionForm.controls['address']
      .setValue(googleAddress.formatted_address);
  }

  changeFile(e){
    this.files = e.target.files;
  }

  get address(){
    return this.missionForm.get('address')
  }

  get phoneNumber(){
    return this.missionForm.get('phoneNumber');
  }

  get description(){
    return this.missionForm.get('description')
  }

  get employerId(){
    return this.missionForm.get(['employer','id'])
  }

  get employerName(){
    return this.missionForm.get(['employer','name'])
  }

  get missionTypeId(){
    return this.missionForm.get(['missionType','id'])
  }

  get missionTypeName(){
    return this.missionForm.get(['missionType','name'])
  }

  get finished(){
    return this.missionForm.get('finished')
  }

  get deleteCurrentImage(){
    return this.missionForm.get('deleteCurrentImage')
  }
}
