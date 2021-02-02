import { NgModule } from '@angular/core';
import { SharedMissionModule } from '@shared-mission/shared-mission.module';
import { CreateMissionImagesProviders } from '@shared-mission/state/create-mission-images/create-mission-images.providers.const';
import { STORE_EFFECTS, STORE_REDUCERS } from 'state-management';
import { DeleteModelHttpEffect, DeleteModelReducer, MailModelsHttpEffect } from 'state-model';
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
    { provide: STORE_EFFECTS, useClass: MailModelsHttpEffect, multi: true},
    { provide: STORE_EFFECTS, useClass: DeleteModelHttpEffect, multi: true},
    { provide: STORE_REDUCERS, useValue: DeleteModelReducer, multi: true},
  ]
})
export class MissionImageListModule {}
