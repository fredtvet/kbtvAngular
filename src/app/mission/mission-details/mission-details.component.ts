import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NavAction, MissionDetails, ConfirmDeleteDialogComponent, ROLES, MissionNote, VertMenuParentExtension } from 'src/app/shared';
import { MissionsService, NotificationService } from 'src/app/core';
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

    this.configureMainNav();

    this._missionsService.getMissionDetails(this.missionId)
      .subscribe(result => {
        this.missionDetails = result;
        this.addMissionToMainNav();
      });
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

  editNote(note: MissionNote){
    console.log(note);
    this.router.navigate(['oppdrag', this.missionId, 'notater', note.id, 'rediger'])
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

  private deleteMission(){
    this._missionsService.deleteMission(this.missionId).subscribe(
      res => {
        if(res){
          this.onBack();
          this.notificationService.setNotification('Vellykket! Oppdrag slettet.')
        }
      }
    );
  }

  private editMission = (e: string) => {
    this.router.navigate(['oppdrag', this.missionId, 'rediger'])
  }

  private createNote = (e: string) => {
    this.router.navigate(['oppdrag', this.missionId, 'notater','ny'])
  }

  private  openCreateReportDialog = (e: string) => {
    const deleteDialogRef = this.dialog.open(MissionReportFormComponent);
    deleteDialogRef.afterClosed().subscribe(data => this.createReport(data));
  }

  private openMissionDeleteDialog = (e: string) => {
    const deleteDialogRef = this.dialog.open(ConfirmDeleteDialogComponent);
    deleteDialogRef.afterClosed().subscribe(confirmed => {if(confirmed)this.deleteMission()});
  }

  configureMainNav(){
    this.vertActions = [
      new NavAction("Legg til rapport", "note_add","createReport", this.openCreateReportDialog, [ROLES.Leder]),
      new NavAction("Legg til notat", "add_comment","createNote", this.createNote),
      new NavAction("Rediger", "edit","edit", this.editMission, [ROLES.Leder]),
      new NavAction("Slett", "delete_forever", "delete", this.openMissionDeleteDialog, [ROLES.Leder])
    ];
    this.mainNavConfig.vertActions = this.vertActions;
    this.mainNavConfig.altNav = true;
  }

  addMissionToMainNav(){
    this.mainNavConfig.title = this.missionDetails.mission.address.replace(", Norge","").replace(/,/g, ";");
    this.mainNavConfig.subTitle = this.missionDetails.mission.finished ? 'Oppdrag ferdig!' : '';
    this.mainNavConfig.subIcon = this.missionDetails.mission.finished ? 'check' : '';
  }

  onBack(){
    this.router.navigate(['/oppdrag'])
  }

}
