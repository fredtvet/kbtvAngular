import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployersService } from 'src/app/core';
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
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  public employers: Employer[];

  ngOnInit() {
    this.employersService.getEmployers().subscribe(response => {
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
    .subscribe(success => {
        this.employers = this.employers.map(e => {
          if(e.id == employer.id) return employer;
          else return e; });
          this.openSnackBar('Vellykket oppdatering!')
      },
      error => this.openSnackBar('Mislykket! Noe gikk feil.')
    );
  }

  deleteEmployer(id: number){
    this.employersService.deleteEmployer(id).subscribe(
      res => {
        this.employers = this.employers.filter(x => x.id !== id);
        this.openSnackBar('Vellykket! Arbeidsgiver slettet.')
      },
      error => this.openSnackBar('Mislykket! Noe gikk feil.')
    );

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
    .subscribe(
      id => {
        employer.id = id;
        this.employers.push(employer);
        this.openSnackBar('Vellykket! Ny arbeidsgiver registrert.')
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
