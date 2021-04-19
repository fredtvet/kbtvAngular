import { SaveModelFileAction } from '@actions/global-actions';
import { NgModule } from '@angular/core';
import { GenericActionRequestMap } from '@core/configurations/optimistic/generic-action-request-map.const';
import { SaveModelFileReducer } from '@core/state/save-model-file/save-model-file.reducer';
import { SaveModelFileValidatorInterceptor } from '@core/state/save-model-file/save-model-file.validator';
import { CreateMissionImagesProviders } from '@shared-mission/create-mission-images/create-mission-images.providers';
import { SharedMissionModule } from '@shared-mission/shared-mission.module';
import { _formToSaveModelConverter } from '@shared/acton-converters/form-to-save-model.converter';
import { ModelFormModule } from 'model/form';
import { DeleteModelAction, DeleteModelReducer, SaveModelAction, SaveModelReducer } from 'model/state-commands';
import { OptimisticHttpModule } from 'optimistic-http';
import { STORE_ACTION_INTERCEPTORS, STORE_REDUCERS } from 'state-management';
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
  providers: [
    ...CreateMissionImagesProviders,
    {provide: STORE_REDUCERS, useValue: SaveModelFileReducer, multi: true},
    {provide: STORE_ACTION_INTERCEPTORS, useClass: SaveModelFileValidatorInterceptor, multi: true},
    {provide: STORE_REDUCERS, useValue: SaveModelReducer, multi: true},
    {provide: STORE_REDUCERS, useValue: DeleteModelReducer, multi: true},
    {provide: STORE_REDUCERS, useValue: UpdateLastVisitedReducer, multi: true}
  ],
  imports: [
    SharedMissionModule,
    MissionListRoutingModule,
    ModelFormModule.forFeature(_formToSaveModelConverter),     
    OptimisticHttpModule.forFeature({
      [SaveModelAction]: GenericActionRequestMap[SaveModelAction],  
      [DeleteModelAction]: GenericActionRequestMap[DeleteModelAction],   
      [SaveModelFileAction]: GenericActionRequestMap[SaveModelFileAction], 
    }),   
  ]
})
export class MissionListModule {}
