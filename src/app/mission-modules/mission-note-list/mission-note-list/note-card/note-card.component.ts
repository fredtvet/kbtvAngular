import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MissionNote } from 'src/app/core/models';
import { RolePresets } from 'src/app/shared-app/enums';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteCardComponent {
  RolePresets = RolePresets;
  
  @Input() note: MissionNote;

  @Output() deleteClicked = new EventEmitter();
  @Output() editClicked = new EventEmitter();

  constructor() { }

  deleteNote = () => this.deleteClicked.emit(this.note.id);

  editNote = () => this.editClicked.emit(this.note.id);
}
