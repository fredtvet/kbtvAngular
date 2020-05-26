import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MissionRoutingModule } from './mission-routing.module';
import { MissionDetailsComponent } from './mission-details/mission-details.component';
import { MissionListComponent } from './mission-list/mission-list.component';
import { MissionNoteFormComponent } from './components/mission-note-form/mission-note-form.component';
import { MissionReportFormComponent } from './components/mission-report-form/mission-report-form.component';
import { ConfirmDialogComponent } from '../shared/components';
import { MissionDetailsViewComponent } from './mission-details/mission-details-view/mission-details-view.component';
import { MissionNoteListComponent } from './mission-details/mission-details-view/mission-note-list/mission-note-list.component';
import { DatePipe } from '@angular/common';
import { MissionFormViewComponent } from './components/mission-form/mission-form-view/mission-form-view.component';
import { MissionFormComponent } from './components/mission-form/mission-form.component';
import { MissionNoteFormViewComponent } from './components/mission-note-form/mission-note-form-view/mission-note-form-view.component';
import { MissionListViewComponent } from './mission-list/mission-list-view/mission-list-view.component';
import { MissionFormSheetWrapperComponent } from './components/mission-form/mission-form-sheet-wrapper.component';
import { MissionNoteFormSheetWrapperComponent } from './components/mission-note-form/mission-note-form-sheet-wrapper.component';
import { MissionReportFormSheetWrapperComponent } from './components/mission-report-form/mission-report-form-sheet-wrapper.component';
import { MissionReportFormViewComponent } from './components/mission-report-form/mission-report-form-view/mission-report-form-view.component';
import { ImageViewerDialogComponent } from './components/image-viewer-dialog/image-viewer-dialog.component';
import { ImageListComponent } from './mission-details/mission-details-view/image-list/image-list.component';
import { MailImageSheetComponent } from './mission-details/mission-details-view/mail-image-sheet/mail-image-sheet.component';



@NgModule({
  declarations: [
    MissionDetailsComponent,
    MissionDetailsViewComponent,
    MissionListComponent,
    MissionListViewComponent,   
    MissionNoteListComponent,
    MissionFormComponent,
    MissionFormViewComponent,
    MissionFormSheetWrapperComponent,   
    MissionNoteFormComponent,
    MissionNoteFormViewComponent,
    MissionNoteFormSheetWrapperComponent,
    MissionReportFormComponent,
    MissionReportFormViewComponent,
    MissionReportFormSheetWrapperComponent,
    ImageListComponent,
    ImageViewerDialogComponent,
    MailImageSheetComponent
  ],
  providers: [
    DatePipe,
  ],
  entryComponents:[
    ConfirmDialogComponent,
    ImageViewerDialogComponent,
    MissionReportFormComponent,
    MissionFormSheetWrapperComponent,
    MissionNoteFormSheetWrapperComponent,
    MissionReportFormSheetWrapperComponent,
    MailImageSheetComponent
  ],
  exports: [
    MissionFormSheetWrapperComponent,
  ],
  imports: [
    SharedModule,
    MissionRoutingModule
  ]
})
export class MissionModule { }
