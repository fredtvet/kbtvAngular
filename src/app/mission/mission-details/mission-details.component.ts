import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavAction, MissionDetails, ConfirmDeleteDialogComponent, ROLES } from 'src/app/shared';
import { MissionsService, MissionImagesService, MissionNotesService, MissionReportsService } from 'src/app/core';
import { MissionFormComponent } from '../mission-form/mission-form.component';
import { MissionNoteFormComponent } from '../mission-note-form/mission-note-form.component';
import { MissionReportFormComponent } from '../mission-report-form/mission-report-form.component';

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

  public mission: MissionDetails;

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
    private _imagesService: MissionImagesService,
    private _missionNotesService: MissionNotesService,
    private _missionReportsService: MissionReportsService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) {}

  ngOnInit(){
    this.routeSub = this.route.params.subscribe(params => this.missionId = params['id']);

    this._missionsService.getMissionDetails(this.missionId).subscribe(
      result => {
        this.mission = result;
        this.mission.address = this.mission.address.replace(", Norge","").replace(/,/g, ";");
      },
      error => console.log(error)
    );
  }


  uploadImages(files: FileList){
    this.imagesToUpload = files;
    this._imagesService.uploadImages(this.missionId, files).subscribe(
      result => {
        this.mission.missionImages = this.mission.missionImages.concat(result);
        this.openSnackBar(`Vellykket! ${result.length} ${result.length > 1 ? 'bilder' : 'bilde'} lastet opp.`)
      },
      error => this.openSnackBar('Mislykket! Noe gikk feil.')
      );
  }

  deleteImage(id){
    this._imagesService.deleteImage(this.missionId, id).subscribe(
      res => {
        this.mission.missionImages = this.mission.missionImages.filter(val => val.id != id);
        this.openSnackBar('Vellykket! Bilde slettet');
      },
      error => this.openSnackBar('Mislykket! Noe gikk feil.')
    );
  }

  handleEvent(e){
    switch(e){
      case "delete":{
        this.openDeleteDialog();
        break;
      }
      case "edit":{
        this.openEditDialog();
        break;
      }
      case "back":{
        this.onBack();
        break;
      }
      case "createReport":{
        this.openCreateMissionReportDialog();
        break;
      }
      case "createNote":{
        this.createMissionNote();
        break;
      }
    }
  }



  openDeleteDialog(){
    const deleteDialogRef = this.dialog.open(ConfirmDeleteDialogComponent);
    deleteDialogRef.afterClosed().subscribe(() => this.deleteMission());
  }


  openEditDialog(){
    this._missionsService.getMission(this.missionId)
      .subscribe(data => {
        const dialogRef = this.dialog.open(MissionFormComponent, {
          width: '100vw',
          height: '100vh',
          panelClass: 'form_dialog',
          data: data,
        });

        dialogRef.afterClosed().subscribe(res => this.editMission(res));
      });
  }



  createMissionNote(){
    const dialogRef = this.dialog.open(MissionNoteFormComponent, {
      width: '100vw',
      height: '100vh',
      panelClass: 'form_dialog',
      data: { missionId: this.missionId }
    });

    dialogRef.afterClosed().subscribe(note => {
      if(note){
        this._missionNotesService.addNote(this.missionId, note)
        .subscribe(id => this.router.navigate(['oppdrag', this.missionId, 'notater', id]));
      }
    });

  }

  openCreateMissionReportDialog(){
    const deleteDialogRef = this.dialog.open(MissionReportFormComponent);
    deleteDialogRef.afterClosed().subscribe(data => this.createMissionReport(data));
  }

  createMissionReport(data){
    if(!data) return null;
    this._missionReportsService.uploadReport(this.missionId, data.files, data.typeId).subscribe(res =>{
      this.mission.missionReports = this.mission.missionReports.concat(res)
    });
  }

  pinnedNotes(pinned: boolean){
    return this.mission.missionNotes.filter(x => x.pinned == pinned);
  }

  deleteMission(){
    this._missionsService.deleteMission(this.missionId).subscribe(
      res => {
        this.onBack();
        this.openSnackBar('Vellykket! Oppdrag slettet.')
      },
      error => this.openSnackBar('Mislykket! Noe gikk feil.')
    );
  }

  editMission(data: any){
    if(!data) return null;
    this._missionsService.updateMission(data)
    .subscribe(
        success => {
            this.mission.address = data.address.replace(", Norge","").replace(/,/g, ";");
            this.mission.phoneNumber = data.phoneNumber;
            this.mission.description = data.description;
            this.mission.finished = data.finished;
            this.openSnackBar('Vellykket oppdatering!');
        },
        error => this.openSnackBar('Mislykket! Noe gikk feil.')
    )
  }

  onBack(){
    this.router.navigate(['/oppdrag'])
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  trackByFn(index:number, missionImage:any): number {
    return missionImage.id;
  }

  openSnackBar(message: string){
    this._snackBar.open(message, 'lukk', {
      duration: 2000,
      panelClass: 'snackbar_margin'
    });
  }

}
