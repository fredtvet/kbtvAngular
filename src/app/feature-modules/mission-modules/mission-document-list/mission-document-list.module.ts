import { NgModule } from '@angular/core';
import { DeleteModelProviders, MailModelsProviders, SaveModelFileProviders } from '@model/state/providers.const';
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
    ModelFormModule,
    MissionDocumentListRoutingModule
  ],
  providers: [
    ...MailModelsProviders,
    ...SaveModelFileProviders,
    ...DeleteModelProviders,
  ],
})
export class MissionDocumentListModule {}
