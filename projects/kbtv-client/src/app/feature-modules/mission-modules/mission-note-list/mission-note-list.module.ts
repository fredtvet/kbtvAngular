import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MissionNoteListRoutingModule } from './mission-note-list-routing.module';
import { MissionNoteListComponent } from './mission-note-list/mission-note-list.component';
import { NoteItemComponent } from './mission-note-list/note-item/note-item.component';

@NgModule({
  declarations: [
    MissionNoteListComponent,
    NoteItemComponent,
  ],
  imports: [
    SharedModule,
    MissionNoteListRoutingModule
  ],
})
export class MissionNoteListModule { }
