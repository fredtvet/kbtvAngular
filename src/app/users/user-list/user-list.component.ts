import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/core';
import { User, ROLES } from 'src/app/shared';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public ROLES = ROLES;
  constructor(
    private usersService: UsersService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  public users: User[];

  ngOnInit() {
    this.usersService.getUsers().subscribe(response => {
      this.users = response['result'];
    })
  }

  openEditDialog(user: User){
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '100vw',
      height: '100vh',
      panelClass: 'form_dialog',
      data: user,
    });

    dialogRef.afterClosed().subscribe(data => {
      if(data == 'deleted') this.deleteUser(user.userName);
      else if (data){
        data.userName = user.userName;
        this.updateUser(data);
      }
    });
  }

  updateUser(user: User){
    this.usersService.updateUser(user)
    .subscribe(
      success => {
        this.users = this.users.map(e => {
                  if(e.userName == user.userName) return user;
                  else return e; })
        this.openSnackBar('Vellykket oppdatering!')
      },
      error => this.openSnackBar('Mislykket! Noe gikk feil.')
    );
  }

  deleteUser(username: string){
    this.usersService.deleteUser(username).subscribe(
      res => {
        this.users = this.users.filter(x => x.userName !== username);
        this.openSnackBar('Vellykket! Bruker slettet.')
      },
      error => this.openSnackBar('Mislykket! Noe gikk feil.')
    );
  }

  openCreateDialog(){
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '100vw',
      height: '100vh',
      panelClass: 'form_dialog'
    });

    dialogRef.afterClosed().subscribe(user => {
      if(user) this.createUser(user);
    });
  }

  createUser(user: any){
    this.usersService.addUser(user)
    .subscribe(
      success => {
        this.users.push(user);
        this.openSnackBar('Vellykket! Ny bruker registrert.')
      },
      error => this.openSnackBar('Mislykket! Noe gikk feil.')
    );
  }

  openSnackBar(message: string){
    this._snackBar.open(message, 'lukk', {
      duration: 2000,
      panelClass: 'snackbar_margin'
    });
  }

}
