import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { MissionNote, NavAction, ConfirmDeleteDialogComponent, ROLES } from 'src/app/shared';
import { MissionsService, NotificationService } from 'src/app/core';
import { MissionNoteFormComponent } from '../mission-note-form/mission-note-form.component';

@Component({
  selector: 'app-mission-note-details',
  templateUrl: './mission-note-details.component.html',
  styleUrls: ['./mission-note-details.component.css']
})
export class MissionNoteDetailsComponent implements OnInit {
  public ROLES = ROLES;
  public note: MissionNote;

  private routeSub: Subscription;

  public missionId: number;
  public noteId: number;

  public navActions: NavAction[] = [
    new NavAction("edit", "Rediger", "edit", [ROLES.Leder]),
    new NavAction("delete", "Slett", "delete_forever", [ROLES.Leder])
  ];

  constructor(
    private _missionsService: MissionsService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.missionId = params['missionId'];
      this.noteId = params['id']
    });

    this._missionsService.getMissionNoteDetails(this.missionId, this.noteId)
      .subscribe(result => this.note = result);

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
    }
  }

  openDeleteDialog(){
    const deleteDialogRef = this.dialog.open(ConfirmDeleteDialogComponent);
    deleteDialogRef.afterClosed().subscribe(res => {if(res){this.deleteMissionNote()}});
  }

  openEditDialog(){
    const dialogRef = this.dialog.open(MissionNoteFormComponent, {
      width: '100vw',
      height: '100vh',
      panelClass: 'form_dialog',
      data: { note: this.note, missionId: this.missionId },
    });

    dialogRef.afterClosed().subscribe(res => this.editMissionNote(res));
  }

  deleteMissionNote(){
    this._missionsService.deleteMissionNote(this.missionId, this.noteId).subscribe(
      res => {
        this.onBack();
        this.notificationService.setNotification('Vellykket! Notat slettet.');
      }
    );
  }

  editMissionNote(data){
    if(!data) return null;
    this._missionsService.updateMissionNote(this.missionId, data)
      .subscribe(data =>this.notificationService.setNotification('Vellykket oppdatering!'));
  }

  onBack(){
    this.router.navigate(['/oppdrag', this.missionId, 'detaljer'])
  }

  ngOnDestroy(){
    this.routeSub.unsubscribe();
  }

}
