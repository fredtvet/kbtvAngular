import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import { RolesService } from 'src/app/core';
import { User, NavAction, ConfirmDeleteDialogComponent, ROLES } from 'src/app/shared';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  constructor(
    private _rolesService: RolesService,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UserFormComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public user: User) { }

    public ROLES = ROLES;

    userForm: FormGroup;

    public actions: NavAction[] = [];

    public roles: any;

    public title: string = "Rediger bruker";

    public isEditForm: boolean = true;

    ngOnInit(){
      this._rolesService.getRoles()
          .subscribe(result => {
            this.roles = result;
            if(!this.isEditForm)
              this.userForm.controls['role'].setValue(this.roles.find(x => ROLES.Ansatt), {onlySelf: true});
          });

      if(this.user == null){
        this.isEditForm = false;
        this.title = 'Ny bruker',
        this.user = new User();
      }else{
        this.actions.push(new NavAction("delete", "Slett", "delete_forever", [ROLES.Leder]))
      }

      this.initalizeForm();

    }

    initalizeForm(){
      this.userForm = this._formBuilder.group({
        userName: [{value: this.user.userName, disabled: this.isEditForm},[
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(100)
        ]],
        password: [{value: null, disabled: this.isEditForm},[
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(100)
        ]],
        firstName: [this.user.firstName, [
          Validators.required,
          Validators.maxLength(100)
        ]],
        lastName: [this.user.lastName, [
          Validators.required,
          Validators.maxLength(100)
        ]],
        phoneNumber: [this.user.phoneNumber, [
          Validators.minLength(4),
          Validators.maxLength(12)
        ]],
        role: [this.user.role, [
          Validators.required
        ]]
      });
    }

    onSubmit(){
      const {value, valid} = this.userForm;
      if(valid){
          this.dialogRef.close(value);
      }
    }

    handleEvent(e){
      switch(e){
        case "delete":{
          this.deleteEmployee();
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

    changeRole(e){
      this.role.setValue(
        e.target.value,
        {onlySelf: true}
      );
    }

    deleteEmployee(){
      const deleteDialogRef = this.dialog.open(ConfirmDeleteDialogComponent);

      deleteDialogRef.afterClosed().subscribe(res => {
          if(res) this.dialogRef.close('deleted');
      });
    }

    get userName(){
      return this.userForm.get('userName')
    }

    get password(){
      return this.userForm.get('password')
    }

    get firstName(){
      return this.userForm.get('firstName');
    }

    get lastName(){
      return this.userForm.get('lastName')
    }

    get phoneNumber(){
      return this.userForm.get('phoneNumber')
    }

    get role(){
      return this.userForm.get('role')
    }



}
