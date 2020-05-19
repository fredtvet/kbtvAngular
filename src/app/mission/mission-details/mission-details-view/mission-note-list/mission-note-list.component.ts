import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MissionNote } from 'src/app/shared/models';
import { ConfirmDialogComponent } from 'src/app/shared/components';
import { Roles } from '../../../../shared/enums';
import { MatDialog, MatBottomSheet } from '@angular/material';
import { filter } from 'rxjs/operators';
import { MissionNoteFormSheetWrapperComponent } from '../../../components/mission-note-form/mission-note-form-sheet-wrapper.component';

@Component({
  selector: 'app-mission-note-list',
  templateUrl: './mission-note-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionNoteListComponent {

  @Input() notes: MissionNote[] = [];
  @Output() noteDeleted = new EventEmitter();

  Roles = Roles;

  constructor(public dialog: MatDialog, private _bottomSheet:MatBottomSheet) { }

  openMissionNoteForm = (noteIdPreset: number) => 
    this._bottomSheet.open(MissionNoteFormSheetWrapperComponent, {data: {noteIdPreset}});

  openDeleteDialog(noteId: number){
    const deleteDialogRef = this.dialog.open(ConfirmDialogComponent, {data: 'Bekreft at du ønsker å slette notatet'});
    deleteDialogRef.afterClosed().pipe(filter(res => res)).subscribe(res => this.noteDeleted.emit(noteId));
  }
}
