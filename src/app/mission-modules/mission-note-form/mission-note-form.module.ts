import { NgModule } from '@angular/core';
import { MissionNoteFormEntryComponent } from './mission-note-form-entry.component';
import { MissionNoteFormSheetWrapperComponent } from './mission-note-form/mission-note-form-sheet-wrapper.component';
import { MissionNoteFormComponent } from './mission-note-form/mission-note-form.component';
import { MissionNoteFormViewComponent } from './mission-note-form/mission-note-form-view/mission-note-form-view.component';
import { MissionNoteFormRoutingModule } from './mission-note-form-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [
      MissionNoteFormEntryComponent,
      MissionNoteFormSheetWrapperComponent,
      MissionNoteFormComponent,
      MissionNoteFormViewComponent
    ],
    imports: [
      MissionNoteFormRoutingModule,
      SharedModule
    ]
  })
  export class MissionNoteFormModule { }
  