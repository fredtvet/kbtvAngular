import { NgModule } from '@angular/core';
import { MissionNoteFormRoutingModule } from './mission-note-form-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MissionNoteFormEntryComponent } from './mission-note-form-entry.component';
import { MissionNoteFormViewComponent } from './mission-note-form/mission-note-form-view/mission-note-form-view.component';
import { MissionNoteFormSheetWrapperComponent } from './mission-note-form/mission-note-form-sheet-wrapper.component';
import { MissionNoteFormComponent } from './mission-note-form/mission-note-form.component';



@NgModule({
  declarations: [
    MissionNoteFormEntryComponent,
    MissionNoteFormSheetWrapperComponent,
    MissionNoteFormComponent,
    MissionNoteFormViewComponent
  ],
  entryComponents:[
    MissionNoteFormSheetWrapperComponent
  ],
  imports: [
    MissionNoteFormRoutingModule,
    SharedModule
  ]
})
export class MissionNoteFormModule { }
