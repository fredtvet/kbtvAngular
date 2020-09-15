import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MissionNoteFormRoutingModule } from './mission-note-form-routing.module';
import { MissionNoteFormViewComponent } from './mission-note-form-view/mission-note-form-view.component';

@NgModule({
    declarations: [
      MissionNoteFormViewComponent
    ],
    imports: [
      MissionNoteFormRoutingModule,
      SharedModule
    ]
  })
  export class MissionNoteFormModule { }
  