import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService, NotificationService, IdentityService } from 'src/app/core';
import { User, ROLES } from 'src/app/shared';
import { UserFormComponent } from '../user-form/user-form.component';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public ROLES = ROLES;
  constructor(
    private usersService: UsersService,
    private identityService: IdentityService,
    private notificationService: NotificationService,
    public dialog: MatDialog,) { }

  public users: User[];

  public currentUser: User;

  ngOnInit() {
    combineLatest(
      this.usersService.getByRole$(ROLES.Leder),
      this.usersService.getByRole$(ROLES.Mellomleder),
      this.usersService.getByRole$(ROLES.Ansatt)
    ).subscribe(([group1, group2, group3]) => {this.users = [...group1, ...group2, ...group3], console.log(this.users)});

    this.identityService.currentUser$.subscribe(data => this.currentUser = data);
  }

  openEditDialog(user: User){
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '80vw',
      height: 'auto',
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
    this.usersService.update$(user)
      .subscribe(success => this.notificationService.setNotification('Vellykket oppdatering!'));
  }

  deleteUser(username: string){
    this.usersService.delete$(username)
      .subscribe(res => this.notificationService.setNotification('Vellykket! Bruker slettet.'));
  }

  openCreateDialog(){
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '80vw',
      height: 'auto',
      panelClass: 'form_dialog'
    });

    dialogRef.afterClosed().subscribe(user => {
      if(user) this.createUser(user);
    });
  }

  createUser(user: any){
    this.usersService.add$(user)
     .subscribe(success => this.notificationService.setNotification('Vellykket! Ny bruker registrert.'));
  }

}
