import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MissionNoteListRoutingModule } from './mission-note-list-routing.module';
import { MissionNoteListComponent } from './mission-note-list/mission-note-list.component';
import { NoteCardComponent } from './mission-note-list/note-card/note-card.component';

@NgModule({
  declarations: [
    MissionNoteListComponent,
    NoteCardComponent,
  ],
  imports: [
    SharedModule,
    MissionNoteListRoutingModule
  ],
})
export class MissionNoteListModule { }
