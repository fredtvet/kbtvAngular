import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MissionNote } from 'src/app/shared/models';
import { ConfirmDeleteDialogComponent } from 'src/app/shared/components';
import { Roles } from '../../../shared/enums';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-mission-note-list',
  templateUrl: './mission-note-list.component.html'
})
export class MissionNoteListComponent {

  @Input() notes: MissionNote[] = [];

  @Input() missionId: number;

  @Output() noteEdit = new EventEmitter();
  @Output() noteDeleted = new EventEmitter();

  Roles = Roles;

  constructor(public dialog: MatDialog) { }



  openDeleteDialog(noteId: number){
    const deleteDialogRef = this.dialog.open(ConfirmDeleteDialogComponent);
    deleteDialogRef.afterClosed().subscribe(res => {if(res) this.noteDeleted.emit(noteId)});
  }
}
