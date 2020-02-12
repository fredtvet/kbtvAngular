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
  @ViewChildren('notePanel') notePanels !: QueryList<MatExpansionPanel>;

  @Input() notes: MissionNote[] = [];

  @Input() missionId: number;

  @Output() loadNoteDetails = new EventEmitter();
  @Output() editNote = new EventEmitter();
  @Output() deleteNote = new EventEmitter();

  ROLES = ROLES;
  openPanelIndex: number = -1;

  constructor(public dialog: MatDialog) { }

  loadDetails(noteId:number, index:number){
    this.openPanelIndex = index;
    this.loadNoteDetails.emit(noteId);
  }

  openDeleteDialog(noteId: number){
    const deleteDialogRef = this.dialog.open(ConfirmDeleteDialogComponent);
    deleteDialogRef.afterClosed().subscribe(res => {
      if(res){
        this.deleteNote.emit(noteId)
        this.openPanelIndex =  -1;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges){
    for(let propName in changes){
      if(propName == "notes"){
        this.sortNotes();
        if(this.notePanels && this.openPanelIndex >= 0){
          setTimeout(()=>{ //Using timeout as workaround, doesnt open when fired instantly
            this.notePanels.toArray()[this.openPanelIndex].open();
          }, 25);
        }
      }
    }
  }

  sortNotes(){
    this.notes.sort(function(x, y) {
      // true values first
      return (x.pinned === y.pinned)? 0 : x.pinned? -1 : 1;
      // false values first
      // return (x === y)? 0 : x? 1 : -1;
     });
  }

}
