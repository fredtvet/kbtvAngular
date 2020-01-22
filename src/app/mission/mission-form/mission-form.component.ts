import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MissionType, Employer, Mission, ROLES } from 'src/app/shared';
import { MissionForm } from './mission-form.model';

@Component({
  selector: 'app-mission-form',
  templateUrl: './mission-form.component.html',
  styleUrls: ['./mission-form.component.css']
})

export class MissionFormComponent implements OnInit {

  public ROLES = ROLES;

  missionForm: FormGroup;

  googleOptions = {
    types: ['geocode'],
    componentRestrictions: { country: "no" }
  }

  public isStreetAddress = false;

  public title: string = "Rediger oppdrag";

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<MissionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MissionForm)  { }

  ngOnInit(){
    console.log(this.data);
    if(this.data.isCreateForm){
      this.title = 'Nytt oppdrag',
      this.data.mission = new Mission();
    }

    this.initalizeForm();

    let defaultEmployer = this.data.employers.find(x => x.id === this.data.mission.employerId);
    let defaultType = this.data.missionTypes.find(x => x.id === this.data.mission.missionTypeId);

    if(defaultEmployer)
      this.missionForm.get('employerName').setValue(defaultEmployer.name);

    if(defaultType)
      this.missionForm.get('missionTypeName').setValue(defaultType.name);
  }

  initalizeForm(){
    this.missionForm = this._formBuilder.group({
      id: this.data.mission.id,
      address: [this.data.mission.address, [
        Validators.required,
        Validators.maxLength(100)
      ]],
      phoneNumber: [this.data.mission.phoneNumber, [
        Validators.minLength(4),
        Validators.maxLength(12)
      ]],
      description: [this.data.mission.description, [
        Validators.maxLength(400)
      ]],
      finished: [this.data.mission.finished],
      employerName: [],
      missionTypeName: [],
      employerId: [null],
      missionTypeId: [null]
    });
  }

  onSubmit(){
    let existingType = this.data.missionTypes.find(x => x.name === this.missionTypeName.value);
    let existingEmployee = this.data.employers.find(x => x.name === this.employerName.value);

    if(existingType){
      this.missionTypeId.setValue(existingType.id);
      this.missionTypeName.setValue("");
    }

    if(existingEmployee){
      this.employerId.setValue(existingEmployee.id);
      this.employerName.setValue("");
    }

    const {value, valid} = this.missionForm;

    if(valid){
      console.log(value);
      this.dialogRef.close(value);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleAddressChange(googleAddress){
    this.missionForm.controls['address']
      .setValue(googleAddress.formatted_address);
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

  get employerName(){
    return this.missionForm.get('employerName')
  }

  get missionTypeName(){
    return this.missionForm.get('missionTypeName')
  }

  get employerId(){
    return this.missionForm.get('employerId')
  }

  get missionTypeId(){
    return this.missionForm.get('missionTypeId')
  }

  get finished(){
    return this.missionForm.get('finished')
  }

}
