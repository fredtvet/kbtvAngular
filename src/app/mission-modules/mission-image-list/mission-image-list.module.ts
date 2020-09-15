import { NgModule } from '@angular/core';
import { MissionImageListRoutingModule } from './mission-image-list-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MissionImageListComponent } from './mission-image-list/mission-image-list.component';
import { ImageListComponent } from './mission-image-list/image-list/image-list.component';
import { ImageViewerDialogWrapperComponent } from './image-viewer/image-viewer-dialog-wrapper.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { MailImageFormComponent } from './mail-image-form.component';


@NgModule({
  declarations: [
    MissionImageListComponent,
    ImageListComponent,
    ImageViewerDialogWrapperComponent,
    ImageViewerComponent,
    ImageListComponent,
    MailImageFormComponent
  ],
  imports: [
    SharedModule,
    MissionImageListRoutingModule
  ]
})
export class MissionImageListModule { }
