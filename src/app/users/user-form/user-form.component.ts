import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import { RolesService } from 'src/app/core';
import { User, ConfirmDeleteDialogComponent, ROLES, VertMenuParentExtension } from 'src/app/shared';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent  {

  public ROLES = ROLES;
  isEditForm = true;
  userForm: FormGroup;
  roles: any;
  title: string;
  icon: string;

  constructor(
    private _rolesService: RolesService,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UserFormComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public user: User) {  }

    ngOnInit(){
      this.configure();
      this.initalizeForm();
      this.fetchRoles();
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

    openDeleteDialog(){
      const deleteDialogRef = this.dialog.open(ConfirmDeleteDialogComponent);

      deleteDialogRef.afterClosed().subscribe(res => {
          if(res) this.dialogRef.close('deleted');
      });
    }

    changeRole(e){
      this.role.setValue(
        e.target.value,
        {onlySelf: true}
      );
    }

    fetchRoles(){
      this._rolesService.getAll$()
          .subscribe(result => {
            this.roles = result;
            if(!this.isEditForm)
              this.userForm.controls['role'].setValue(this.roles.find(x => ROLES.Ansatt), {onlySelf: true});
          });
    }

    configure(){
      if(this.user == null){
        this.isEditForm = false;
        this.title = "Ny bruker";
        this.icon = 'person_add';
        this.user = new User();
      }else{
        this.title = "Rediger bruker";
        this.icon = 'edit';
      }
    }

    onNoClick(): void {
      this.dialogRef.close();
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
