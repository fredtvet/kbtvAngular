import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MissionNote, NavAction, ConfirmDeleteDialogComponent, ROLES } from 'src/app/shared';
import { MissionNotesService } from 'src/app/core';
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
    private _notesService: MissionNotesService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.missionId = params['missionId'];
      this.noteId = params['id']
    });

    this._notesService.getNote(this.missionId, this.noteId).subscribe(result => {
      this.note = result;
    },
      error => console.log(error)
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
    }
  }

  openDeleteDialog(){
    const deleteDialogRef = this.dialog.open(ConfirmDeleteDialogComponent);
    deleteDialogRef.afterClosed().subscribe(() => this.deleteMissionNote());
  }

  openEditDialog(){
    this._notesService.getNote(this.missionId, this.noteId)
    .subscribe(res => {
      const dialogRef = this.dialog.open(MissionNoteFormComponent, {
        width: '100vw',
        height: '100vh',
        panelClass: 'form_dialog',
        data: { note: res, missionId: this.missionId },
      });

      dialogRef.afterClosed().subscribe(res => this.editMissionNote(res));
    });
  }

  deleteMissionNote(){
    this._notesService.deleteNote(this.missionId, this.noteId).subscribe(
      res => {
        this.onBack();
        this.openSnackBar('Vellykket! Notat slettet.');
      }
    );
  }

  editMissionNote(data){
    if(!data) return null;
    this._notesService.updateNote(this.missionId, data)
      .subscribe(
        success => {
          this.note = data;
          this.openSnackBar('Vellykket oppdatering!');
        },
        error => this.openSnackBar('Mislykket! Noe gikk feil.')
    );
  }

  onBack(){
    this.router.navigate(['/oppdrag', this.missionId, 'detaljer'])
  }

  openSnackBar(message: string){
    this._snackBar.open(message, 'lukk', {
      duration: 2000,
      panelClass: 'snackbar_margin'
    });
  }

  ngOnDestroy(){
    this.routeSub.unsubscribe();
  }

}
