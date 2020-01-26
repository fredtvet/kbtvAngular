import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, forkJoin, combineLatest } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavAction, MissionDetails, ConfirmDeleteDialogComponent, ROLES, MissionNote, Mission, MissionReportType, MissionType, Employer } from 'src/app/shared';
import { MissionsService, MissionTypesService, EmployersService, MissionReportTypesService } from 'src/app/core';
import { MissionFormComponent } from '../mission-form/mission-form.component';
import { MissionNoteFormComponent } from '../mission-note-form/mission-note-form.component';
import { MissionReportFormComponent } from '../mission-report-form/mission-report-form.component';
import { MissionForm } from '../mission-form/mission-form.model';


@Component({
  selector: 'app-mission-details',
  templateUrl: './mission-details.component.html',
  styleUrls: ['./mission-details.component.css']
})

export class MissionDetailsComponent {
  public ROLES = ROLES;

  imagesToUpload: FileList;
  reportToUpload: File;

  unloadedThumbnails: any[] = [];
  reloadThumbnailsState: boolean = false;
  reloadInterval: any;

  public missionDetails: MissionDetails;

  private routeSub: Subscription;

  public missionId: number;

  public navActions: NavAction[] = [
    new NavAction("createReport", "Legg til rapport", "note_add", [ROLES.Leder]),
    new NavAction("createNote", "Legg til notat", "add_comment"),
    new NavAction("edit", "Rediger", "edit", [ROLES.Leder]),
    new NavAction("delete", "Slett", "delete_forever", [ROLES.Leder])
  ];;

  constructor(
    private _missionsService: MissionsService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) {}

  ngOnInit(){
    this.routeSub = this.route.params.subscribe(params => this.missionId = params['id']);

    this._missionsService.getMissionDetails(this.missionId)
      .subscribe(
        result => {
          if(result == undefined) return null;
          this.missionDetails = result;
          this.missionDetails.mission.address = this.missionDetails.mission.address.replace(", Norge","").replace(/,/g, ";");
        },
      error => console.log(error)
    );
  }

  uploadImages(files: FileList){

    this.imagesToUpload = files;
    this._missionsService.addMissionImages(this.missionId, files).subscribe(
      result => this.openSnackBar(`Vellykket! ${result.length} ${result.length > 1 ? 'bilder' : 'bilde'} lastet opp.`),
      error => this.openSnackBar('Mislykket! Noe gikk feil.')
      );
  }

  deleteImage(id){
    this._missionsService.deleteMissionImage(this.missionId, id).subscribe(
      res => {
        this.openSnackBar('Vellykket! Bilde slettet');
      },
      error => this.openSnackBar('Mislykket! Noe gikk feil.')
    );
  }

  handleNavEvents(e){
    switch(e){
      case "delete":{
        this.openMissionDeleteDialog();
        break;
      }
      case "edit":{
        this.openEditDialog();
        break;
      }
      case "createReport":{
        this.openCreateReportDialog();
        break;
      }
      case "createNote":{
        this.openCreateNoteDialog();
        break;
      }
      case "back":{
        this.onBack();
        break;
      }
    }
  }

  openEditDialog(){
    let formData = new MissionForm(this.missionDetails.mission, false);
    const dialogRef = this.dialog.open(MissionFormComponent, {
      width: '100vw',
      height: '100vh',
      panelClass: 'form_dialog',
      data: formData,
    });

    dialogRef.afterClosed().subscribe(res => this.editMission(res));

  }

  editMission(mission: Mission){
    if(!mission) return null;
    this._missionsService.updateMission(mission)
    .subscribe(
        success => this.openSnackBar('Vellykket oppdatering!'),
        error => this.openSnackBar('Mislykket! Noe gikk feil.')
    )
  }

  openCreateNoteDialog(){
    const dialogRef = this.dialog.open(MissionNoteFormComponent, {
      width: '100vw',
      height: '100vh',
      panelClass: 'form_dialog',
      data: { missionId: this.missionId }
    });

    dialogRef.afterClosed().subscribe(note => this.createMissionNote(note));
  }

  createMissionNote(note: MissionNote){
    if(note){
      this._missionsService.addMissionNote(this.missionId, note)
      .subscribe(note => this.router.navigate(['oppdrag', this.missionId, 'notater', note.id]));
    }
  }

  openCreateReportDialog(){
    const deleteDialogRef = this.dialog.open(MissionReportFormComponent);
    deleteDialogRef.afterClosed().subscribe(data => this.createMissionReport(data));
  }

  createMissionReport(data){
    if(!data) return null;
    this._missionsService.addMissionReport(this.missionId, data.reportType, data.files).subscribe(
      res => this.openSnackBar('Vellykket! Rapport lastet opp'),
      error => this.openSnackBar('Mislykket! Noe gikk feil.'));
  }

  openMissionDeleteDialog(){
    const deleteDialogRef = this.dialog.open(ConfirmDeleteDialogComponent);
    deleteDialogRef.afterClosed().subscribe(confirmed => {if(confirmed)this.deleteMission()});
  }

  deleteMission(){
    this._missionsService.deleteMission(this.missionId).subscribe(
      res => {
        if(res){
          this.onBack();
          this.openSnackBar('Vellykket! Oppdrag slettet.')
        }
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

  onBack(){
    this.router.navigate(['/oppdrag'])
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
