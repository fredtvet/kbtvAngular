import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import { Employer, NavAction, ConfirmDeleteDialogComponent, ROLES } from 'src/app/shared';

@Component({
  selector: 'app-employer-form',
  templateUrl: './employer-form.component.html'
})
export class EmployerFormComponent implements OnInit {
  public ROLES = ROLES;

  googleOptions = {
    types: ['geocode'],
    componentRestrictions: { country: "no" }
  }

  public isStreetAddress = false;

  employerForm: FormGroup;

  public title: string = "Rediger arbeidsgiver";

  public isEditForm: boolean = true;

  public actions: NavAction[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EmployerFormComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public employer: Employer){ }



    ngOnInit(){
      if(this.employer == null){
        this.isEditForm = false;
        this.title = 'Ny arbeidsgiver',
        this.employer = new Employer();
      }else
        this.actions.push(new NavAction("delete", "Slett", "delete_forever", [ROLES.Leder]));

      this.initalizeForm();
    }

    initalizeForm(){
      this.employerForm = this._formBuilder.group({
        name: [this.employer.name, [
          Validators.required,
          Validators.maxLength(200)
        ]],
        phoneNumber: [this.employer.phoneNumber, [
          Validators.minLength(4),
          Validators.maxLength(12)
        ]],
        address: [this.employer.address, [
          Validators.maxLength(100)
        ]]
      });
    }

    onSubmit(){
      const {value, valid} = this.employerForm;
      if(valid){
          this.dialogRef.close(value);
      }
    }

    handleEvent(e){
      switch(e){
        case "delete":{
          this.deleteEmployer();
          break;
        }
        case "back":{
          this.onNoClick();
          break;
        }
      }
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    deleteEmployer(){
      const deleteDialogRef = this.dialog.open(ConfirmDeleteDialogComponent);

      deleteDialogRef.afterClosed().subscribe(res => {
          if(res) this.dialogRef.close('deleted');
      });
    }

    handleAddressChange(googleAddress){
      this.employerForm.controls['address']
        .setValue(googleAddress.formatted_address);
    }

    get name(){
      return this.employerForm.get('name')
    }

    get phoneNumber(){
      return this.employerForm.get('phoneNumber')
    }

    get address(){
      return this.employerForm.get('address')
    }



}
