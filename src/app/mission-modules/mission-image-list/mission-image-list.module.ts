import { NgModule } from '@angular/core';
import { MissionImageListRoutingModule } from './mission-image-list-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MissionImageListComponent } from './mission-image-list/mission-image-list.component';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import { ImageViewerDialogWrapperComponent } from './components/image-viewer/image-viewer-dialog-wrapper.component';
import { ImageListComponent } from './mission-image-list/image-list/image-list.component';
import { MailImageSheetComponent } from './components/mail-image-sheet.component';
import { ThumbnailPipe } from './pipes/thumbnail.pipe';


@NgModule({
  declarations: [
    MissionImageListComponent,
    ImageViewerComponent,
    ImageViewerDialogWrapperComponent,
    MailImageSheetComponent,
    ImageListComponent,
    ThumbnailPipe
  ],
  imports: [
    SharedModule,
    MissionImageListRoutingModule
  ]
})
export class MissionImageListModule { }
