import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployersService, NotificationService } from 'src/app/core';
import { Employer, ROLES } from 'src/app/shared';
import { EmployerFormComponent } from '../employer-form/employer-form.component';

@Component({
  selector: 'app-employer-list',
  templateUrl: './employer-list.component.html',
  styleUrls: ['./employer-list.component.css']
})
export class EmployerListComponent implements OnInit {
  public ROLES = ROLES;

  constructor(
    private employersService: EmployersService,
    private notificationService: NotificationService,
    public dialog: MatDialog) { }

  public employers: Employer[];

  ngOnInit() {
    this.employersService.getEmployers().subscribe(response => {
      console.log(response);
      this.employers = response;
    })
  }

  openEditDialog(employer: Employer){
    const dialogRef = this.dialog.open(EmployerFormComponent, {
      width: '100vw',
      height: '100vh',
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
    this.employersService.updateEmployer(employer)
      .subscribe(data => this.notificationService.setNotification('Vellykket oppdatering!'));
  }

  deleteEmployer(id: number){
    this.employersService.deleteEmployer(id)
      .subscribe(data => this.notificationService.setNotification('Vellykket! Oppdragsgiver slettet.'));
  }

  openCreateDialog(){
    const dialogRef = this.dialog.open(EmployerFormComponent, {
      width: '100vw',
      height: '100vh',
      panelClass: 'form_dialog'
    });

    dialogRef.afterClosed().subscribe(employer => {
      if(employer){
        this.createEmployer(employer);
      }
    });
  }

  createEmployer(employer: any){
    this.employersService.addEmployer(employer)
      .subscribe(data => this.notificationService.setNotification('Vellykket! Ny oppdragsgiver registrert.'));
  }
}
