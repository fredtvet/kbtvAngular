import { SaveModelFileAction } from '@actions/global-actions';
import { NgModule } from '@angular/core';
import { GenericActionRequestMap } from '@core/configurations/optimistic/generic-action-request-map.const';
import { MailModelsHttpEffect } from '@core/state/mail-models/mail-models.http.effect';
import { SaveModelFileReducer } from '@core/state/save-model-file/save-model-file.reducer';
import { SaveModelFileValidatorInterceptor } from '@core/state/save-model-file/save-model-file.validator';
import { SharedMissionModule } from '@shared-mission/shared-mission.module';
import { _formToSaveModelFileConverter } from '@shared/acton-converters/form-to-save-model-file.converter';
import { ModelFormModule } from 'model/form';
import { DeleteModelAction, DeleteModelReducer } from 'model/state-commands';
import { OptimisticHttpModule } from 'optimistic-http';
import { STORE_ACTION_INTERCEPTORS, STORE_EFFECTS, STORE_REDUCERS } from 'state-management';
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
    ModelFormModule.forFeature(_formToSaveModelFileConverter),
    OptimisticHttpModule.forFeature({
      [DeleteModelAction]: GenericActionRequestMap[DeleteModelAction],   
      [SaveModelFileAction]: GenericActionRequestMap[SaveModelFileAction], 
    }),  
    MissionDocumentListRoutingModule
  ],
  providers: [
    {provide: STORE_EFFECTS, useClass: MailModelsHttpEffect, multi: true},
    {provide: STORE_REDUCERS, useValue: SaveModelFileReducer, multi: true},
    {provide: STORE_ACTION_INTERCEPTORS, useClass: SaveModelFileValidatorInterceptor, multi: true},
    {provide: STORE_REDUCERS, useValue: DeleteModelReducer, multi: true},
  ],
})
export class MissionDocumentListModule {}
