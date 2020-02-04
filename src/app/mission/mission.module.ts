import { NgModule } from '@angular/core';

import { MissionRoutingModule } from './mission-routing.module';
import { MissionDetailsComponent } from './mission-details/mission-details.component';
import { MissionFormComponent } from './components/mission-form/mission-form.component';
import { MissionListComponent } from './mission-list/mission-list.component';
import { MissionNoteDetailsComponent } from './mission-note-details/mission-note-details.component';
import { MissionNoteFormComponent } from './components/mission-note-form/mission-note-form.component';
import { MissionReportFormComponent } from './components/mission-report-form/mission-report-form.component';
import { SharedModule, ConfirmDeleteDialogComponent, ImageViewerDialogComponent } from '../shared';
import { MissionDetailsViewComponent } from './components/mission-details-view/mission-details-view.component';
import { MissionNoteListComponent } from './components/mission-note-list/mission-note-list.component';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    MissionDetailsComponent,
    MissionFormComponent,
    MissionListComponent,
    MissionNoteDetailsComponent,
    MissionNoteFormComponent,
    MissionReportFormComponent,
    MissionDetailsViewComponent,
    MissionNoteListComponent
  ],
  providers: [
    DatePipe
  ],
  entryComponents:[
    MissionFormComponent,
    MissionNoteFormComponent,
    MissionReportFormComponent,
    ConfirmDeleteDialogComponent,
    ImageViewerDialogComponent
  ],
  imports: [
    SharedModule,
    MissionRoutingModule
  ]
})
export class MissionModule { }
