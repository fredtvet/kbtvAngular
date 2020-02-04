import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { MissionNote, NavAction, ConfirmDeleteDialogComponent, ROLES, VertMenuParentExtension } from 'src/app/shared';
import { MissionsService, NotificationService } from 'src/app/core';
import { MissionNoteFormComponent } from '../components/mission-note-form/mission-note-form.component';
import { MainNavConfig } from 'src/app/shared/layout/main-nav/main-nav-config.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-mission-note-details',
  templateUrl: './mission-note-details.component.html',
  styleUrls: ['./mission-note-details.component.css']
})
export class MissionNoteDetailsComponent extends VertMenuParentExtension {
  ROLES = ROLES;
  mainNavConfig = new MainNavConfig();

  note: MissionNote;

  private routeSub: Subscription;

  missionId: number;
  noteId: number;

  constructor(
    private _missionsService: MissionsService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private datePipe: DatePipe,
  ) { super(); }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.missionId = params['missionId'];
      this.noteId = params['id']
    });

    this._missionsService.getMissionNoteDetails(this.missionId, this.noteId)
      .subscribe(result => {
        this.note = result;
        this.configure();
      });

  }

  openDeleteDialog(e: string, ctx: any){
    const deleteDialogRef = ctx.dialog.open(ConfirmDeleteDialogComponent);
    deleteDialogRef.afterClosed().subscribe(res => {if(res){ctx.deleteMissionNote()}});
  }

  openEditDialog(e: string, ctx: any){
    const dialogRef = ctx.dialog.open(MissionNoteFormComponent, {
      width: '100vw',
      height: '100vh',
      panelClass: 'form_dialog',
      data: { note: ctx.note, missionId: ctx.missionId },
    });

    dialogRef.afterClosed().subscribe(res => ctx.editMissionNote(res));
  }

  deleteMissionNote(){
    this._missionsService.deleteMissionNote(this.missionId, this.noteId).subscribe(
      res => {
        this.onBack();
        this.notificationService.setNotification('Vellykket! Notat slettet.');
      }
    );
  }

  editMissionNote(note: MissionNote){
    if(!note) return null;
    this._missionsService.updateMissionNote(this.missionId, note)
      .subscribe(data =>this.notificationService.setNotification('Vellykket oppdatering!'));
  }

  configure(){
    this.vertActions = [
      new NavAction("Rediger", "edit", "edit", this.openEditDialog, [ROLES.Leder]),
      new NavAction("Slett", "delete_forever", "delete", this.openDeleteDialog, [ROLES.Leder])
    ];

    this.mainNavConfig.vertActions = this.vertActions;
    this.mainNavConfig.altNav = true;
    this.mainNavConfig.icon = "edit";
    this.mainNavConfig.title = this.note.title || this.datePipe.transform(this.note.createdAt, 'short');
  }

  onBack(){
    this.router.navigate(['/oppdrag', this.missionId, 'detaljer'])
  }

  ngOnDestroy(){
    this.routeSub.unsubscribe();
  }

}
