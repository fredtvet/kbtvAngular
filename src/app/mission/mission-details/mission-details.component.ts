import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NavAction, MissionDetails, ConfirmDeleteDialogComponent, ROLES, MissionNote, Mission, VertMenuParentExtension } from 'src/app/shared';
import { MissionsService, NotificationService } from 'src/app/core';
import { MissionFormComponent } from '../components/mission-form/mission-form.component';
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

  navActions: NavAction[] = [
    new NavAction("createReport", "Legg til rapport", "note_add", [ROLES.Leder]),
    new NavAction("createNote", "Legg til notat", "add_comment"),
    new NavAction("edit", "Rediger", "edit", [ROLES.Leder]),
    new NavAction("delete", "Slett", "delete_forever", [ROLES.Leder])
  ];;

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

  editMission(mission: Mission){
    if(!mission) return null;
    this._missionsService.updateMission(mission)
      .subscribe(success => this.notificationService.setNotification('Vellykket oppdatering!'))
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

  openEditDialog(e: string, ctx:any){
    const dialogRef = ctx.dialog.open(MissionFormComponent, {
      width: '80vw',
      height: 'auto',
      panelClass: 'form_dialog',
      data: ctx.missionDetails.mission,
    });

    dialogRef.afterClosed().subscribe(res => ctx.editMission(res));
  }

  openCreateNoteDialog(e: string, ctx:any){
    const dialogRef = ctx.dialog.open(MissionNoteFormComponent, {
      width: '80vw',
      height: 'auto',
      panelClass: 'form_dialog',
      data: { missionId: ctx.missionId }
    });

    dialogRef.afterClosed().subscribe(note => ctx.createNote(note));
  }

  openCreateReportDialog(e: string, ctx:any){
    const deleteDialogRef = ctx.dialog.open(MissionReportFormComponent);
    deleteDialogRef.afterClosed().subscribe(data => ctx.createReport(data));
  }

  openMissionDeleteDialog(e: string, ctx:any){
    const deleteDialogRef = ctx.dialog.open(ConfirmDeleteDialogComponent);
    deleteDialogRef.afterClosed().subscribe(confirmed => {if(confirmed)ctx.deleteMission()});
  }

  loadNoteDetails(noteId: number){
    let note = this.missionDetails.missionNotes.find(x => x.id == noteId);
    console.log(note);
    if(note && (note.content == null || note.content.length == 0)){ //If note exist with content
      this._missionsService.loadMissionNoteDetails(this.missionId, noteId);
    }
  }

  configure(){
    this.vertActions = [
      new NavAction("Legg til rapport", "note_add","createReport", this.openCreateReportDialog, [ROLES.Leder]),
      new NavAction("Legg til notat", "add_comment","createNote", this.openCreateNoteDialog),
      new NavAction("Rediger", "edit","edit", this.openEditDialog, [ROLES.Leder]),
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
