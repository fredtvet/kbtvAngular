import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MissionNote } from 'src/app/shared/interfaces/models';
import { RolePresets } from 'src/app/shared/enums';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html'
})
export class NoteCardComponent implements OnInit {
  RolePresets = RolePresets;
  
  @Input() note: MissionNote;

  @Output() deleteClicked = new EventEmitter();
  @Output() editClicked = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  deleteNote = () => this.deleteClicked.emit(this.note.id);

  editNote = () => this.editClicked.emit(this.note.id);

}
