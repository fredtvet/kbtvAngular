import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MissionType, Employer, Mission, ROLES } from 'src/app/shared';
import { MissionTypesService, EmployersService } from 'src/app/core';

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

  public missionTypes: MissionType[];

  public employers: Employer[];

  public isCreateForm: boolean = false;

  constructor(
    private _missionTypesService: MissionTypesService,
    private _employersService: EmployersService,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<MissionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public mission: Mission)  { }

  ngOnInit(){

    if(this.mission == null){
      this.isCreateForm = true;
      this.title = 'Nytt oppdrag',
      this.mission = new Mission();
    }

    this.initalizeForm();

    this._missionTypesService.getMissionTypes().subscribe(result => {
      this.missionTypes = result;
    });

    this._employersService.getEmployers().subscribe(result => {
      this.employers = result;
    });

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
      employerName: [this.mission.employerName],
      missionTypeName: [this.mission.missionTypeName],
      employerId: [0],
      missionTypeId: [0]
    });
  }

  onSubmit(){
    let existingType = this.missionTypes.find(x => x.name === this.missionTypeName.value);
    let existingEmployee = this.missionTypes.find(x => x.name === this.employerName.value);

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
