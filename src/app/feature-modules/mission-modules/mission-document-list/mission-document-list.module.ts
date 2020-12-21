import { NgModule } from '@angular/core';
import { SaveModelFileProviders } from '@core/state/providers.const';
import { ModelFormModule } from '@model-form/model-form.module';
import { DeleteModelProviders, MailModelsProviders } from '@model/state/providers.const';
import { _formToSaveModelFileConverter } from '@shared/acton-converters/form-to-save-model-file.converter';
import { SharedModule } from '@shared/shared.module';
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
    ...MailModelsProviders,
    ...SaveModelFileProviders,
    ...DeleteModelProviders,
  ],
})
export class MissionDocumentListModule {}