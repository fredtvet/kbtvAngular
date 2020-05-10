import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MissionRoutingModule } from './mission-routing.module';
import { MissionDetailsComponent } from './mission-details/mission-details.component';
import { MissionListComponent } from './mission-list/mission-list.component';
import { MissionNoteFormComponent } from './mission-note-form/mission-note-form.component';
import { MissionReportFormComponent } from './components/mission-report-form/mission-report-form.component';
import { ConfirmDialogComponent, ImageViewerDialogComponent } from '../shared/components';
import { MissionDetailsViewComponent } from './mission-details/mission-details-view/mission-details-view.component';
import { MissionNoteListComponent } from './components/mission-note-list/mission-note-list.component';
import { DatePipe } from '@angular/common';
import { MissionFormViewComponent } from './mission-form/mission-form-view/mission-form-view.component';
import { MissionFormComponent } from './mission-form/mission-form.component';
import { MissionNoteFormViewComponent } from './mission-note-form/mission-note-form-view/mission-note-form-view.component';



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
    DatePipe,
  ],
  entryComponents:[
    ConfirmDialogComponent,
    ImageViewerDialogComponent,
    MissionReportFormComponent
  ],
  imports: [
    SharedModule,
    MissionRoutingModule
  ],
  exports: [
    MissionFormComponent,
    MissionFormViewComponent
  ]
})
export class MissionModule { }
