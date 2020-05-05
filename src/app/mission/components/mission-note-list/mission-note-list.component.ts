import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MissionNote } from 'src/app/shared/models';
import { ConfirmDialogComponent } from 'src/app/shared/components';
import { Roles } from '../../../shared/enums';
import { MatDialog } from '@angular/material';
import { filter } from 'rxjs/operators';

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
    const deleteDialogRef = this.dialog.open(ConfirmDialogComponent, {data: 'Bekreft at du ønsker å slette notatet'});
    deleteDialogRef.afterClosed().pipe(filter(res => res)).subscribe(res => this.noteDeleted.emit(noteId));
  }
}
