import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MissionType, Employer, Mission, ROLES } from 'src/app/shared';
import { MissionForm } from './mission-form.model';
import { MissionTypesService, EmployersService } from 'src/app/core';

@Component({
  selector: 'app-mission-form',
  templateUrl: './mission-form.component.html',
  styleUrls: ['./mission-form.component.css']
})

export class MissionFormComponent implements OnInit {

  public ROLES = ROLES;

  missionForm: FormGroup;

  public types: MissionType[] = [];
  public employers: Employer[] = [];

  googleOptions = {
    types: ['geocode'],
    componentRestrictions: { country: "no" }
  }

  public isStreetAddress = false;

  public title: string = "Rediger oppdrag";

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<MissionFormComponent>,
    private _missionTypesService: MissionTypesService,
    private _employersService: EmployersService,
    @Inject(MAT_DIALOG_DATA) public data: MissionForm)  { }

  ngOnInit(){

    this._missionTypesService.getMissionTypes().subscribe(data => this.types =  data);
    this._employersService.getEmployers().subscribe(data => this.employers = data);

    if(this.data.isCreateForm){
      this.title = 'Nytt oppdrag',
      this.data.mission = new Mission();
    }

    this.initalizeForm();
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
      employer: this._formBuilder.group({
        id: [],
        name: [this.data.mission.employer ? this.data.mission.employer.name : null],
      }),
      missionType: this._formBuilder.group({
        id: [],
        name: [this.data.mission.missionType ? this.data.mission.missionType.name : null],
      })
    });
  }

  onSubmit(){
    let existingType = this.types.find(x => x.name === this.missionTypeName.value);
    let existingEmployee = this.employers.find(x => x.name === this.employerName.value);

    if(existingType)
      this.missionTypeId.setValue(existingType.id);

    if(existingEmployee){
      this.employerId.setValue(existingEmployee.id);
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
