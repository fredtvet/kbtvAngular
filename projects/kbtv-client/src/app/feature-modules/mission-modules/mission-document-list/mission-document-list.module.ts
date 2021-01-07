import { NgModule } from '@angular/core';
import { SaveModelFileProviders } from '@core/state/providers.const';
import { _formToSaveModelFileConverter } from '@shared/acton-converters/form-to-save-model-file.converter';
import { SharedModule } from '@shared/shared.module';
import { ModelFormModule } from 'model-form';
import { STORE_EFFECTS, STORE_REDUCERS } from 'state-management';
import { DeleteModelHttpEffect, DeleteModelReducer, MailModelsHttpEffect } from 'state-model';
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
    SharedModule, 
    ModelFormModule.forFeature(_formToSaveModelFileConverter),
    MissionDocumentListRoutingModule
  ],
  providers: [
    {provide: STORE_EFFECTS, useClass: MailModelsHttpEffect, multi: true},
    ...SaveModelFileProviders,
    {provide: STORE_EFFECTS, useClass: DeleteModelHttpEffect, multi: true},
    {provide: STORE_REDUCERS, useValue: DeleteModelReducer, multi: true},
  ],
})
export class MissionDocumentListModule {}
