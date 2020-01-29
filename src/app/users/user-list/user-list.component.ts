import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService, NotificationService } from 'src/app/core';
import { User, ROLES } from 'src/app/shared';
import { UserFormComponent } from '../user-form/user-form.component';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public ROLES = ROLES;
  constructor(
    private usersService: UsersService,
    private notificationService: NotificationService,
    public dialog: MatDialog,) { }

  public users: User[];

  ngOnInit() {
    this.usersService.getUsers().subscribe(response => this.users = response)
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
      .subscribe(success => this.notificationService.setNotification('Vellykket oppdatering!'));
  }

  deleteUser(username: string){
    this.usersService.deleteUser(username)
      .subscribe(res => this.notificationService.setNotification('Vellykket! Bruker slettet.'));
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
     .subscribe(success => this.notificationService.setNotification('Vellykket! Ny bruker registrert.'));
  }

}
