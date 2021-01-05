import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MissionNote } from '@core/models';
import { RolePresets } from '@shared-app/enums/roles.enum';

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
