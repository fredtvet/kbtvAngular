import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MissionType, Employer, Mission, ROLES } from 'src/app/shared';

@Component({
  selector: 'app-mission-form-view',
  templateUrl: './mission-form-view.component.html'
})

export class MissionFormViewComponent implements OnInit {
  ROLES = ROLES;

  @Input() mission: Mission = null;
  @Input() missionTypes: MissionType[];
  @Input() employers: Employer[];
  @Output() submit = new EventEmitter();

  title: string;
  icon: string;

  missionForm: FormGroup;

  googleOptions = {
    types: ['geocode'],
    componentRestrictions: { country: "no" }
  }
  isStreetAddress = false;

  isCreateForm = false;

  constructor(
    private _formBuilder: FormBuilder)  { }

  ngOnInit(){
    this.configure();
    this.initalizeForm();
  }

  ngOnChanges(){
    if(this.mission) this.initalizeForm();
  }

  initalizeForm(){
    this.missionForm = this._formBuilder.group({
      id: this.mission.id,
      address: [this.mission.address, [
        Validators.required,
        Validators.maxLength(100)
      ]],
      phoneNumber: [this.mission.phoneNumber, [
        Validators.minLength(4),
        Validators.maxLength(12)
      ]],
      description: [this.mission.description, [
        Validators.maxLength(400)
      ]],
      finished: [this.mission.finished],
      employer: this._formBuilder.group({
        id: [null],
        name: [this.mission.employer ? this.mission.employer.name : null],
      }),
      missionType: this._formBuilder.group({
        id: [null],
        name: [this.mission.missionType ? this.mission.missionType.name : null],
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

    const {value, valid} = this.missionForm;

    if(valid) this.submit.emit(value);
  }

  handleAddressChange(googleAddress){
    this.missionForm.controls['address']
      .setValue(googleAddress.formatted_address);
  }

  configure(){
    if(this.mission == null){
      this.isCreateForm = true;
      this.title = 'Nytt oppdrag',
      this.icon = 'add';
      this.mission = new Mission();
    }else{
      this.title = 'Rediger oppdrag',
      this.icon = 'edit';
    }
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

}
