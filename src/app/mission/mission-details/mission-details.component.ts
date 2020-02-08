import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NavAction, MissionDetails, ConfirmDeleteDialogComponent, ROLES, MissionNote, VertMenuParentExtension } from 'src/app/shared';
import { MissionsService, NotificationService } from 'src/app/core';
import { MissionNoteFormComponent } from '../components/mission-note-form/mission-note-form.component';
import { MissionReportFormComponent } from '../components/mission-report-form/mission-report-form.component';
import { take } from 'rxjs/operators';
import { MainNavConfig } from 'src/app/shared/layout/main-nav/main-nav-config.model';


@Component({
  selector: 'app-mission-details',
  templateUrl: './mission-details.component.html',
  styleUrls: ['./mission-details.component.css']
})

export class MissionDetailsComponent extends VertMenuParentExtension{
  ROLES = ROLES;

  mainNavConfig = new MainNavConfig();

  missionDetails: MissionDetails;

  missionId: number;

  constructor(
    private _missionsService: MissionsService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog) { super(); }

  ngOnInit(){
    this.route.params.pipe(take(1)).subscribe(params => this.missionId = params['id']);

    this._missionsService.getMissionDetails(this.missionId)
      .subscribe(result => {
        this.missionDetails = result;
        this.configure();
      });
  }

  deleteMission(){
    this._missionsService.deleteMission(this.missionId).subscribe(
      res => {
        if(res){
          this.onBack();
          this.notificationService.setNotification('Vellykket! Oppdrag slettet.')
        }
      }
    );
  }

  uploadImages(files: FileList)
  {
    this._missionsService.addMissionImages(this.missionId, files).pipe(take(1))
      .subscribe(data => this.notificationService.setNotification(`Vellykket! ${data.length} ${data.length > 1 ? 'bilder' : 'bilde'} lastet opp.`));
  }

  deleteImage(id:number){
    this._missionsService.deleteMissionImage(this.missionId, id).pipe(take(1))
      .subscribe(res =>  this.notificationService.setNotification('Vellykket! Bilde slettet'));
  }

  createNote(note: MissionNote){
    if(note){
      this._missionsService.addMissionNote(this.missionId, note)
      .subscribe(note => this.router.navigate(['oppdrag', this.missionId, 'notater', note.id]));
    }
  }

  editNote(note: MissionNote){
    if(!note) return null;
    this._missionsService.updateMissionNote(this.missionId, note)
      .subscribe(data =>this.notificationService.setNotification('Vellykket oppdatering!'));
  }

  deleteNote(noteId: number){
    this._missionsService.deleteMissionNote(this.missionId, noteId)
      .subscribe(res => this.notificationService.setNotification('Vellykket! Notat slettet.'));
  }

  createReport(data){
    if(!data) return null;
    this._missionsService.addMissionReport(this.missionId, data.reportType, data.files)
      .subscribe(res => this.notificationService.setNotification('Vellykket! Rapport lastet opp'));
  }

  loadNoteDetails(noteId: number){
    let note = this.missionDetails.missionNotes.find(x => x.id == noteId);
    if(note && (note.content == null || note.content.length == 0)){ //If note exist with content
      this._missionsService.loadMissionNoteDetails(this.missionId, noteId);
    }
  }

  private editMission = (e: string) => {
    this.router.navigate(['oppdrag', this.missionId, 'rediger'])
  }

  private openCreateNoteDialog = (e: string) => {
    const dialogRef = this.dialog.open(MissionNoteFormComponent, {
      width: '80vw',
      height: 'auto',
      panelClass: 'form_dialog',
      data: { missionId: this.missionId }
    });

    dialogRef.afterClosed().subscribe(note => this.createNote(note));
  }

  private  openCreateReportDialog = (e: string) => {
    const deleteDialogRef = this.dialog.open(MissionReportFormComponent);
    deleteDialogRef.afterClosed().subscribe(data => this.createReport(data));
  }

  private openMissionDeleteDialog = (e: string) => {
    const deleteDialogRef = this.dialog.open(ConfirmDeleteDialogComponent);
    deleteDialogRef.afterClosed().subscribe(confirmed => {if(confirmed)this.deleteMission()});
  }

  configure(){
    this.vertActions = [
      new NavAction("Legg til rapport", "note_add","createReport", this.openCreateReportDialog, [ROLES.Leder]),
      new NavAction("Legg til notat", "add_comment","createNote", this.openCreateNoteDialog),
      new NavAction("Rediger", "edit","edit", this.editMission, [ROLES.Leder]),
      new NavAction("Slett", "delete_forever", "delete", this.openMissionDeleteDialog, [ROLES.Leder])
    ];

    this.mainNavConfig.vertActions = this.vertActions;
    this.mainNavConfig.altNav = true;
    this.mainNavConfig.title = this.missionDetails.mission.address.replace(", Norge","").replace(/,/g, ";");
    this.mainNavConfig.subTitle = this.missionDetails.mission.finished ? 'Oppdrag ferdig!' : '';
    this.mainNavConfig.subIcon = this.missionDetails.mission.finished ? 'check' : '';
  }

  onBack(){
    this.router.navigate(['/oppdrag'])
  }

}
