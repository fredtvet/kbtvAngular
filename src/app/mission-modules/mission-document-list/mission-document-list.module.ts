import { NgModule } from '@angular/core';
import { DeleteModelProviders, MailModelsProviders, SaveModelFileProviders } from 'src/app/model/state/providers.const';
import { ModelFormModule } from 'src/app/shared/model-form/model-form.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { StateModule } from 'src/app/state/state.module';
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
