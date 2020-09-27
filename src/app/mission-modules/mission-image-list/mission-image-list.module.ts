import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ImageViewerDialogWrapperComponent } from './image-viewer/image-viewer-dialog-wrapper.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { MailImageFormComponent } from './mail-image-form.component';
import { MissionImageListRoutingModule } from './mission-image-list-routing.module';
import { MissionImageListComponent } from './mission-image-list/mission-image-list.component';


@NgModule({
  declarations: [
    MissionImageListComponent,
    ImageViewerDialogWrapperComponent,
    ImageViewerComponent,
    MailImageFormComponent
  ],
  imports: [
    SharedModule,
    MissionImageListRoutingModule
  ]
})
export class MissionImageListModule { }
