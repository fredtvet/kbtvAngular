import { NgModule } from '@angular/core';
import { DeleteModelHttpEffect } from 'src/app/core/services/model/state/delete-model/delete-model.http.effect';
import { DeleteModelReducer } from 'src/app/core/services/model/state/delete-model/delete-model.reducer';
import { MailModelsHttpEffect } from 'src/app/core/services/model/state/mail-models/mail-models.http.effect';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateMissionImagesHttpEffect } from './create-mission-images/create-mission-images.http.effect';
import { CreateMissionImagesReducer } from './create-mission-images/create-mission-images.reducer';
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
export class MissionImageListModule {
  constructor(
    deleteReducer: DeleteModelReducer, 
    deleteHttpEffect: DeleteModelHttpEffect,
    mailModelsHttpEffect: MailModelsHttpEffect,
    createMissionImagesReducer: CreateMissionImagesReducer,
    createMissionImagesHttpEffect: CreateMissionImagesHttpEffect
  ){}
 }
