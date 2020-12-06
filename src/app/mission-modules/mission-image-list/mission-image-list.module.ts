import { NgModule } from '@angular/core';
import { DeleteModelProviders, MailModelsProviders } from 'src/app/model/state/providers.const';
import { ModelFormModule } from 'src/app/shared/model-form/model-form.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { STORE_EFFECTS, STORE_REDUCERS } from 'src/app/state/injection-tokens';
import { StateModule } from 'src/app/state/state.module';
import { CreateMissionImagesHttpEffect } from './create-mission-images/create-mission-images.http.effect';
import { CreateMissionImagesReducer } from './create-mission-images/create-mission-images.reducer';
import { ImageViewerDialogWrapperComponent } from './image-viewer/image-viewer-dialog-wrapper.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { MissionImageListRoutingModule } from './mission-image-list-routing.module';
import { MissionImageListComponent } from './mission-image-list/mission-image-list.component';


@NgModule({
  declarations: [
    MissionImageListComponent,
    ImageViewerDialogWrapperComponent,
    ImageViewerComponent,
  ],
  imports: [
    SharedModule,
    StateModule,
    ModelFormModule,
    MissionImageListRoutingModule,
  ],
  providers:[
    { provide: STORE_REDUCERS, useValue: CreateMissionImagesReducer, multi: true},
    { provide: STORE_EFFECTS, useClass: CreateMissionImagesHttpEffect, multi: true},
    ...MailModelsProviders
  ]
})
export class MissionImageListModule {}
