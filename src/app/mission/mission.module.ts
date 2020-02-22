import { NgModule } from '@angular/core';

import { MissionRoutingModule } from './mission-routing.module';
import { MissionDetailsComponent } from './mission-details/mission-details.component';
import { MissionListComponent } from './mission-list/mission-list.component';
import { MissionNoteFormComponent } from './mission-note-form/mission-note-form.component';
import { MissionReportFormComponent } from './components/mission-report-form/mission-report-form.component';
import { SharedModule, ConfirmDeleteDialogComponent, ImageViewerDialogComponent } from '../shared';
import { MissionDetailsViewComponent } from './components/mission-details-view/mission-details-view.component';
import { MissionNoteListComponent } from './components/mission-note-list/mission-note-list.component';
import { DatePipe } from '@angular/common';
import { MissionFormViewComponent } from './components/mission-form-view/mission-form-view.component';
import { MissionFormComponent } from './mission-form/mission-form.component';
import { MissionNoteFormViewComponent } from './components/mission-note-form-view/mission-note-form-view.component';


@NgModule({
  declarations: [
    MissionDetailsComponent,
    MissionFormComponent,
    MissionListComponent,
    MissionNoteFormComponent,
    MissionReportFormComponent,
    MissionDetailsViewComponent,
    MissionNoteListComponent,
    MissionFormViewComponent,
    MissionNoteFormViewComponent
  ],
  providers: [
    DatePipe
  ],
  entryComponents:[
    ConfirmDeleteDialogComponent,
    ImageViewerDialogComponent,
    MissionReportFormComponent
  ],
  imports: [
    SharedModule,
    MissionRoutingModule
  ]
})
export class MissionModule { }
