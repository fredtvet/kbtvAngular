import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavAction, MissionDetails, ConfirmDeleteDialogComponent, ROLES, MissionNote } from 'src/app/shared';
import { MissionsService, MissionImagesService, MissionNotesService, MissionReportsService, MissionTypesService, EmployersService } from 'src/app/core';
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
  loading:boolean = true;
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
    private _missionTypesService: MissionTypesService,
    private _employersService: EmployersService,
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
        this.loading = false;
      },
      error => console.log(error)
    );
  }

  uploadImages(files: FileList){

    //Enable loading after 200ms delay if loading is not set
    this.loading = true;

    this.imagesToUpload = files;
    this._imagesService.uploadImages(this.missionId, files).subscribe(
      result => {
        this.mission.missionImages = this.mission.missionImages.concat(result);
        this.openSnackBar(`Vellykket! ${result.length} ${result.length > 1 ? 'bilder' : 'bilde'} lastet opp.`)
        this.loading = false;
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

    let mission$ = this._missionsService.getMission(this.missionId);
    let types$ = this._missionTypesService.getMissionTypes();
    let employers$ = this._employersService.getEmployers();

    forkJoin([mission$, types$, employers$]).subscribe(data => {
      let formData = new MissionForm(data[0], data[1], data[2], false);
      const dialogRef = this.dialog.open(MissionFormComponent, {
        width: '100vw',
        height: '100vh',
        panelClass: 'form_dialog',
        data: formData,
      });

      dialogRef.afterClosed().subscribe(res => this.editMission(res));
    })
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
      this._missionNotesService.addNote(this.missionId, note)
      .subscribe(id => this.router.navigate(['oppdrag', this.missionId, 'notater', id]));
    }
  }

  openCreateReportDialog(){
    const deleteDialogRef = this.dialog.open(MissionReportFormComponent);
    deleteDialogRef.afterClosed().subscribe(data => this.createMissionReport(data));
  }

  createMissionReport(data){
    if(!data) return null;
    this._missionReportsService.uploadReport(this.missionId, data.files, data.typeId).subscribe(res =>{
      this.mission.missionReports = this.mission.missionReports.concat(res)
    });
  }

  openMissionDeleteDialog(){
    const deleteDialogRef = this.dialog.open(ConfirmDeleteDialogComponent);
    deleteDialogRef.afterClosed().subscribe(() => this.deleteMission());
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
