import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MissionRoutingModule } from './mission-routing.module';
import { MissionDetailsComponent } from './mission-details/mission-details.component';
import { MissionListComponent } from './mission-list/mission-list.component';
import { ConfirmDialogComponent } from '../shared/components';
import { MissionDetailsViewComponent } from './mission-details/mission-details-view/mission-details-view.component';
import { DatePipe } from '@angular/common';
import { MissionListViewComponent } from './mission-list/mission-list-view/mission-list-view.component';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import { ImageListComponent } from './mission-image-list/image-list/image-list.component';
import { MissionImageListComponent } from './mission-image-list/mission-image-list.component';
import { ImageViewerDialogWrapperComponent } from './components/image-viewer/image-viewer-dialog-wrapper.component';
import { MailImageSheetComponent } from './components/mail-image-sheet.component';
import { SelectableCardComponent } from './components/selectable-card/selectable-card.component';
import { MissionDocumentListComponent } from './mission-document-list/mission-document-list.component';
import { DocumentListComponent } from './mission-document-list/document-list/document-list.component';
import { MailDocumentSheetComponent } from './components/mail-document-sheet.component';
import { MissionNoteListComponent } from './mission-note-list/mission-note-list.component';
import { FiletypeFromUrlPipe } from './pipes/filetype-from-url.pipe';
import { FileiconFromFiletypePipe } from './pipes/fileicon-from-filetype.pipe';
import { ArraySlicePipe } from './pipes/array-slice.pipe';
import { ThumbnailPipe } from './pipes/thumbnail.pipe';
import { NoteCardComponent } from './mission-note-list/note-card/note-card.component';


@NgModule({
  declarations: [
    MissionDetailsComponent,
    MissionDetailsViewComponent,
    MissionListComponent,
    MissionListViewComponent,   
    MissionNoteListComponent,
    ImageListComponent,
    ImageViewerComponent, 
    ImageViewerDialogWrapperComponent,
    MailImageSheetComponent,
    MissionImageListComponent,
    SelectableCardComponent,
    MissionDocumentListComponent,
    DocumentListComponent,
    MailDocumentSheetComponent,
    FiletypeFromUrlPipe,
    FileiconFromFiletypePipe,
    ArraySlicePipe,
    ThumbnailPipe,
    NoteCardComponent,
  ],
  providers: [
    DatePipe,
  ],
  entryComponents:[
    ConfirmDialogComponent,
    ImageViewerDialogWrapperComponent,
    MailImageSheetComponent,
    MailDocumentSheetComponent
  ],
  imports: [
    SharedModule,
    MissionRoutingModule
  ]
})
export class MissionModule { }
