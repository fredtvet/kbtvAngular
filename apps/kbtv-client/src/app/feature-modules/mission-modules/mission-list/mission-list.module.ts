import { SetSaveModelFileStateAction } from '@actions/global-actions';
import { NgModule } from '@angular/core';
import { GenericActionRequestMap } from '@core/configurations/optimistic/generic-action-request-map.const';
import { SaveModelFileEffect } from '@core/state/save-model-file/save-model-file.effect';
import { SaveModelFileReducer } from '@core/state/save-model-file/save-model-file.reducer';
import { SaveModelFileValidatorInterceptor } from '@core/state/save-model-file/save-model-file.validator';
import { CreateMissionImagesEffect } from '@shared-mission/create-mission-images.effect';
import { SharedMissionModule } from '@shared-mission/shared-mission.module';
import { ModelFormModule } from 'model/form';
import { DeleteModelAction, ModelStateCommandsModule, SetSaveModelStateAction } from 'model/state-commands';
import { OptimisticHttpModule } from 'optimistic-http';
import { StateManagementModule } from 'state-management';
import { HeaderLayoutSkeletonComponent } from './header-layout-skeleton/header-layout-skeleton.component';
import { EmployerListItemComponent } from './mission-details/mission-details-view/employer-list-item.component';
import { MissionDetailsViewComponent } from './mission-details/mission-details-view/mission-details-view.component';
import { MissionDetailsComponent } from './mission-details/mission-details.component';
import { MissionListRoutingModule } from './mission-list-routing.module';
import { MissionListViewComponent } from './mission-list/mission-list-view/mission-list-view.component';
import { MissionListComponent } from './mission-list/mission-list.component';
import { UpdateLastVisitedReducer } from './update-last-visited.reducer';

@NgModule({
  declarations: [
    MissionDetailsComponent,
    MissionDetailsViewComponent,
    MissionListComponent,
    MissionListViewComponent,
    HeaderLayoutSkeletonComponent,
    EmployerListItemComponent
  ],
  imports: [
    SharedMissionModule,
    MissionListRoutingModule,    
    StateManagementModule.forFeature({
      reducers: [SaveModelFileReducer, UpdateLastVisitedReducer], 
      effects: [CreateMissionImagesEffect, SaveModelFileEffect], 
      actionInterceptors: [SaveModelFileValidatorInterceptor]
    }), 
    ModelStateCommandsModule,
    ModelFormModule,     
    OptimisticHttpModule.forFeature({
      [SetSaveModelStateAction]: GenericActionRequestMap[SetSaveModelStateAction],  
      [DeleteModelAction]: GenericActionRequestMap[DeleteModelAction],   
      [SetSaveModelFileStateAction]: GenericActionRequestMap[SetSaveModelFileStateAction], 
    }),   
  ],
  providers: []
})
export class MissionListModule {}
