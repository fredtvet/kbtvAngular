import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import { Employer, ConfirmDeleteDialogComponent, ROLES } from 'src/app/shared';

@Component({
  selector: 'app-employer-form',
  templateUrl: './employer-form.component.html'
})

export class EmployerFormComponent {
  ROLES = ROLES;

  googleOptions = {
    types: ['geocode'],
    componentRestrictions: { country: "no" }
  }

  isStreetAddress = false;

  employerForm: FormGroup;

  isEditForm: boolean = true;
  title: string;
  icon: string;

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EmployerFormComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public employer: Employer){ }

    ngOnInit(){
      this.configure();
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

    openDeleteDialog(){
      const deleteDialogRef = this.dialog.open(ConfirmDeleteDialogComponent);
      deleteDialogRef.afterClosed().subscribe(res => {
          if(res) this.dialogRef.close('deleted');
      });
    }

    handleAddressChange(googleAddress){
      this.employerForm.controls['address']
        .setValue(googleAddress.formatted_address);
    }

    configure(){
      if(this.employer == null){
        this.title = "Ny oppdragsgiver";
        this.employer = new Employer();
        this.isEditForm = false;
      }else{
        this.title = "Rediger oppdragsgiver";
      }
    }

    onNoClick(): void {
      this.dialogRef.close();
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
