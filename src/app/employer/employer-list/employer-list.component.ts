import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployersService, NotificationService, IdentityService } from 'src/app/core';
import { Employer, ROLES, User } from 'src/app/shared';
import { EmployerFormComponent } from '../employer-form/employer-form.component';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-employer-list',
  templateUrl: './employer-list.component.html',
  styleUrls: ['./employer-list.component.css']
})
export class EmployerListComponent implements OnInit {
  public ROLES = ROLES;

  constructor(
    private employersService: EmployersService,
    private identityService: IdentityService,
    private notificationService: NotificationService,
    public dialog: MatDialog) { }

  public employers: Employer[];

  public currentUser: User;

  ngOnInit() {
    this.employersService.getAll$().subscribe(data => this.employers = data)
    this.identityService.currentUser$.subscribe(data => this.currentUser = data);
  }

  openEditDialog(employer: Employer){
    const dialogRef = this.dialog.open(EmployerFormComponent, {
      width: '80vw',
      height: 'auto',
      panelClass: 'form_dialog',
      data: employer,
    });

    dialogRef.afterClosed().subscribe(data => {
      if(data == 'deleted') this.deleteEmployer(employer.id);
      else if (data){
        data.id = employer.id;
        this.updateEmployer(data);
      }
    });
  }

  updateEmployer(employer: Employer){
    this.employersService.update$(employer)
      .subscribe(data => this.notificationService.setNotification('Vellykket oppdatering!'));
  }

  deleteEmployer(id: number){
    console.log(id);
    this.employersService.delete$(id)
      .subscribe(data => this.notificationService.setNotification('Vellykket! Oppdragsgiver slettet.'));
  }

  openCreateDialog(){
    const dialogRef = this.dialog.open(EmployerFormComponent, {
      width: '80vw',
      height: 'auto',
      panelClass: 'form_dialog'
    });

    dialogRef.afterClosed().subscribe(employer => {
      if(employer){
        this.createEmployer(employer);
      }
    });
  }

  createEmployer(employer: any){
    this.employersService.add$(employer)
      .subscribe(data => this.notificationService.setNotification('Vellykket! Ny oppdragsgiver registrert.'));
  }
}
