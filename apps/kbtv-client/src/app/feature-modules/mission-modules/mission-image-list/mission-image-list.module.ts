import { NgModule } from '@angular/core';
import { SaveModelFileProviders } from '@core/state/providers.const';
import { CreateMissionImagesProviders } from '@shared-mission/create-mission-images/create-mission-images.providers';
import { SharedMissionModule } from '@shared-mission/shared-mission.module';
import { STORE_EFFECTS, STORE_REDUCERS } from 'state-management';
import { DeleteModelHttpEffect, DeleteModelReducer, MailModelsHttpEffect } from 'model-state';
import { MissionImageListRoutingModule } from './mission-image-list-routing.module';
import { MissionImageListComponent } from './mission-image-list/mission-image-list.component';

@NgModule({
  declarations: [MissionImageListComponent],
  imports: [
    SharedMissionModule,
    MissionImageListRoutingModule,
  ],
  providers:[
    ...CreateMissionImagesProviders,
    ...SaveModelFileProviders,
    { provide: STORE_EFFECTS, useClass: MailModelsHttpEffect, multi: true},
    { provide: STORE_EFFECTS, useClass: DeleteModelHttpEffect, multi: true},
    { provide: STORE_REDUCERS, useValue: DeleteModelReducer, multi: true},
  ]
})
export class MissionImageListModule {}
