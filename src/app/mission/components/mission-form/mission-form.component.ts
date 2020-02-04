import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MissionType, Employer, Mission, ROLES } from 'src/app/shared';
import { MissionTypesService, EmployersService } from 'src/app/core';
import { MainNavConfig } from 'src/app/shared/layout/main-nav/main-nav-config.model';

@Component({
  selector: 'app-mission-form',
  templateUrl: './mission-form.component.html',
  styleUrls: ['./mission-form.component.css']
})

export class MissionFormComponent implements OnInit {

  ROLES = ROLES;

  title: string;
  icon: string;

  missionForm: FormGroup;

  types: MissionType[] = [];
  employers: Employer[] = [];

  googleOptions = {
    types: ['geocode'],
    componentRestrictions: { country: "no" }
  }
  isStreetAddress = false;

  isCreateForm = false;

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<MissionFormComponent>,
    private _missionTypesService: MissionTypesService,
    private _employersService: EmployersService,
    @Inject(MAT_DIALOG_DATA) public mission: Mission)  { }

  ngOnInit(){
    this.configure();
    this.initalizeForm();

    this._missionTypesService.getAll$().subscribe(data => this.types =  data);
    this._employersService.getAll$().subscribe(data => this.employers = data);
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
    let existingType = this.types.find(x => x.name === this.missionTypeName.value);
    let existingEmployee = this.employers.find(x => x.name === this.employerName.value);

    if(existingType)
      this.missionTypeId.setValue(existingType.id);

    if(existingEmployee)
      this.employerId.setValue(existingEmployee.id);

    const {value, valid} = this.missionForm;

    if(valid)
      this.dialogRef.close(value);
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

  onNoClick(): void {
    this.dialogRef.close();
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
