import { Component, OnInit  } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MissionList, ROLES } from 'src/app/shared';
import { MissionsService } from 'src/app/core';
import { MissionFormComponent } from '../mission-form/mission-form.component';

@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.css']
})

export class MissionListComponent implements OnInit {

  public ROLES = ROLES;
  public missionList: MissionList = new MissionList();

  private searchString: string = "";

  constructor(
    private _missionsService: MissionsService,
    public dialog: MatDialog,
    private _router: Router,
    private _snackBar: MatSnackBar) {}

  ngOnInit(){
    this._missionsService.getMissionsPaginated().subscribe(
      result => this.missionList = result['result'],
      error => console.log(error)
      );
  }

  searchMissionList(searchString){
    this.searchString = searchString;
    this._missionsService.getMissionsPaginated(this.missionList.paginationInfo.actualPage, this.searchString)
      .subscribe(result => this.missionList = result['result']);
  }

  changePage(pageId){
    this._missionsService.getMissionsPaginated(pageId, this.searchString)
    .subscribe(result => this.missionList = result['result']);
  }

  createMission(){
    const dialogRef = this.dialog.open(MissionFormComponent, {
      width: '100vw',
      height: '100vh',
      panelClass: 'form_dialog'
    });

    dialogRef.afterClosed().subscribe(mission => {
      if(mission){
        this._missionsService.addMission(mission)
        .subscribe(
          id => this._router.navigate(['oppdrag', id, 'detaljer']),
          error => this.openSnackBar('Mislykket! Noe gikk feil.')
        );
      }
    });

  }

  openSnackBar(message: string){
    this._snackBar.open(message, 'lukk', {
      duration: 2000,
      panelClass: 'snackbar_margin'
    });
  }

}
