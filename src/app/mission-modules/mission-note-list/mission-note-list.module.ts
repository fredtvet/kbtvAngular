import { NgModule } from '@angular/core';
import { MissionNoteListRoutingModule } from './mission-note-list-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoteCardComponent } from './mission-note-list/note-card/note-card.component';
import { MissionNoteListComponent } from './mission-note-list/mission-note-list.component';
import { MissionNoteFormViewComponent } from './mission-note-form-view/mission-note-form-view.component';


@NgModule({
  declarations: [
    MissionNoteListComponent,
    NoteCardComponent,
    MissionNoteFormViewComponent,
  ],
  imports: [
    SharedModule,
    MissionNoteListRoutingModule
  ]
})
export class MissionNoteListModule { }
