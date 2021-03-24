import { NgModule } from '@angular/core';
import { SharedMissionModule } from '@shared-mission/shared-mission.module';
import { MissionNoteListRoutingModule } from './mission-note-list-routing.module';
import { MissionNoteListComponent } from './mission-note-list/mission-note-list.component';
import { NoteItemComponent } from './mission-note-list/note-item/note-item.component';

@NgModule({
  declarations: [
    MissionNoteListComponent,
    NoteItemComponent,
  ],
  imports: [
    SharedMissionModule,
    MissionNoteListRoutingModule
  ],
})
export class MissionNoteListModule { }
