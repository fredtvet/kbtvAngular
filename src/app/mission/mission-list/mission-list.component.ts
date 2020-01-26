import { Component, OnInit  } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MissionList, ROLES, Mission, MissionType } from 'src/app/shared';
import { MissionsService, MissionTypesService, EmployersService } from 'src/app/core';
import { MissionFormComponent } from '../mission-form/mission-form.component';
import { forkJoin, combineLatest } from 'rxjs';
import { MissionForm } from '../mission-form/mission-form.model';
import { MissionListService } from 'src/app/core/services/mission-list.service';

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
    private _missionListService: MissionListService,
    public dialog: MatDialog,
    private _router: Router,
    private _snackBar: MatSnackBar) {}

  ngOnInit(){
    this._missionListService.getMissionsPaginated().subscribe(
      result => this.missionList = result['result'],
      error => console.log(error)
      );
  }

  searchMissionList(searchString){
    this.searchString = searchString;
    this._missionListService.getMissionsPaginated(this.missionList.paginationInfo.actualPage, this.searchString)
      .subscribe(result => this.missionList = result['result']);
  }

  changePage(pageId){
    this._missionListService.getMissionsPaginated(pageId, this.searchString)
    .subscribe(result => this.missionList = result['result']);
  }

  openCreateMissionDialog(){
    let formData = new MissionForm(null, true);

    const dialogRef = this.dialog.open(MissionFormComponent, {
      width: '100vw',
      height: '100vh',
      panelClass: 'form_dialog',
      data: formData,
    });

    dialogRef.afterClosed().subscribe(mission => this.createMission(mission));
  }

  createMission(mission: Mission){

    if(!mission) return null;
    this._missionsService.addMission(mission)
      .subscribe(
        mission => this._router.navigate(['oppdrag', mission.id, 'detaljer']),
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
