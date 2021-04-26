import { SaveModelFileAction } from '@actions/global-actions';
import { NgModule } from '@angular/core';
import { GenericActionRequestMap } from '@core/configurations/optimistic/generic-action-request-map.const';
import { MailModelsHttpEffect } from '@core/state/mail-models/mail-models.http.effect';
import { SaveModelFileReducer } from '@core/state/save-model-file/save-model-file.reducer';
import { SaveModelFileValidatorInterceptor } from '@core/state/save-model-file/save-model-file.validator';
import { SharedMissionModule } from '@shared-mission/shared-mission.module';
import { ModelFormModule } from 'model/form';
import { DeleteModelAction, DeleteModelReducer } from 'model/state-commands';
import { OptimisticHttpModule } from 'optimistic-http';
import { StateManagementModule } from 'state-management';
import { MissionDocumentListRoutingModule } from './mission-document-list-routing.module';
import { MissionDocumentListComponent } from './mission-document-list/mission-document-list.component';
import { FileExtensionIconPipe } from './pipes/file-extension-icon.pipe';
import { FileExtensionPipe } from './pipes/file-extension.pipe';

@NgModule({
  declarations: [
    MissionDocumentListComponent,
    FileExtensionIconPipe,
    FileExtensionPipe,
  ],
  imports: [
    SharedMissionModule, 
    StateManagementModule.forFeature({
      reducers: [SaveModelFileReducer, DeleteModelReducer], 
      effects: [MailModelsHttpEffect], 
      actionInterceptors: [SaveModelFileValidatorInterceptor]
    }),
    ModelFormModule,
    OptimisticHttpModule.forFeature({
      [DeleteModelAction]: GenericActionRequestMap[DeleteModelAction],   
      [SaveModelFileAction]: GenericActionRequestMap[SaveModelFileAction], 
    }),  
    MissionDocumentListRoutingModule
  ],
  providers: [],
})
export class MissionDocumentListModule {}
