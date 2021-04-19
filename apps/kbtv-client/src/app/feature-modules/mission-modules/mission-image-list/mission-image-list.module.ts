import { SaveModelFileAction } from '@actions/global-actions';
import { NgModule } from '@angular/core';
import { GenericActionRequestMap } from '@core/configurations/optimistic/generic-action-request-map.const';
import { MailModelsHttpEffect } from '@core/state/mail-models/mail-models.http.effect';
import { SaveModelFileReducer } from '@core/state/save-model-file/save-model-file.reducer';
import { SaveModelFileValidatorInterceptor } from '@core/state/save-model-file/save-model-file.validator';
import { CreateMissionImagesProviders } from '@shared-mission/create-mission-images/create-mission-images.providers';
import { SharedMissionModule } from '@shared-mission/shared-mission.module';
import { DeleteModelAction, DeleteModelReducer } from 'model/state-commands';
import { OptimisticHttpModule } from 'optimistic-http';
import { STORE_ACTION_INTERCEPTORS, STORE_EFFECTS, STORE_REDUCERS } from 'state-management';
import { MissionImageListRoutingModule } from './mission-image-list-routing.module';
import { MissionImageListComponent } from './mission-image-list/mission-image-list.component';

@NgModule({
  declarations: [MissionImageListComponent],
  imports: [
    SharedMissionModule,
    MissionImageListRoutingModule,        
    OptimisticHttpModule.forFeature({
      [DeleteModelAction]: GenericActionRequestMap[DeleteModelAction],   
      [SaveModelFileAction]: GenericActionRequestMap[SaveModelFileAction], 
    }),  
  ],
  providers:[
    ...CreateMissionImagesProviders,
    { provide: STORE_REDUCERS, useValue: SaveModelFileReducer, multi: true },
    { provide: STORE_ACTION_INTERCEPTORS, useClass: SaveModelFileValidatorInterceptor, multi: true },
    { provide: STORE_EFFECTS, useClass: MailModelsHttpEffect, multi: true},
    { provide: STORE_REDUCERS, useValue: DeleteModelReducer, multi: true},
  ]
})
export class MissionImageListModule {}
