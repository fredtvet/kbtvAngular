import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { MissionNote, ConfirmDeleteDialogComponent } from 'src/app/shared';
import { MatExpansionPanel } from '@angular/material/expansion/typings/expansion-panel';
import { ROLES } from 'src/app/shared';
import { MissionNoteFormComponent } from '../../mission-note-form/mission-note-form.component';
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

  ROLES = ROLES;

  constructor(public dialog: MatDialog) { }



  openDeleteDialog(noteId: number){
    const deleteDialogRef = this.dialog.open(ConfirmDeleteDialogComponent);
    deleteDialogRef.afterClosed().subscribe(res => {if(res) this.noteDeleted.emit(noteId)});
  }
}
