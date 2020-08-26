import { NgModule } from '@angular/core';
import { MissionImageListRoutingModule } from './mission-image-list-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MissionImageListComponent } from './mission-image-list/mission-image-list.component';
import { ImageListComponent } from './mission-image-list/image-list/image-list.component';
import { MailImageSheetComponent } from './mail-image-sheet.component';
import { ThumbnailPipe } from './pipes/thumbnail.pipe';
import { ImageViewerDialogWrapperComponent } from './image-viewer/image-viewer-dialog-wrapper.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';


@NgModule({
  declarations: [
    MissionImageListComponent,
    ImageListComponent,
    ImageViewerDialogWrapperComponent,
    ImageViewerComponent,
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
