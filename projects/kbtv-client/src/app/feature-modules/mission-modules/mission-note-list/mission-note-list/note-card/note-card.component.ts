import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RolePermissions } from '@core/configurations/role-permissions.const';
import { MissionNote } from '@core/models';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteCardComponent {
  can = RolePermissions.MissionNoteList
  
  @Input() note: MissionNote;

  @Output() deleteClicked = new EventEmitter();
  @Output() editClicked = new EventEmitter();

  constructor() { }

  deleteNote = () => this.deleteClicked.emit(this.note.id);

  editNote = () => this.editClicked.emit(this.note.id);
}
