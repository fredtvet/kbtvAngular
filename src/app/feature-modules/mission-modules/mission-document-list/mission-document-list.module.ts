import { NgModule } from '@angular/core';
import { SaveModelFileProviders } from '@core/state/save-model-file/save-model-file.providers';
import { DeleteModelProviders, MailModelsProviders } from '@model/state/providers.const';
import { FormToSaveModelFileStateCommandAdapter } from '@shared/form-adapters/form-to-save-model-file-state-command.adapter';
import { ModelFormModule } from '@shared/model-form/model-form.module';
import { SharedModule } from '@shared/shared.module';
import { StateModule } from '@state/state.module';
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
    StateModule,
    ModelFormModule.forFeature(FormToSaveModelFileStateCommandAdapter),
    MissionDocumentListRoutingModule
  ],
  providers: [
    ...MailModelsProviders,
    ...SaveModelFileProviders,
    ...DeleteModelProviders,
  ],
})
export class MissionDocumentListModule {}
