import { NgModule } from '@angular/core';
import { DeleteModelHttpEffect } from 'src/app/core/services/model/state/delete-model/delete-model.http.effect';
import { DeleteModelReducer } from 'src/app/core/services/model/state/delete-model/delete-model.reducer';
import { MailModelsHttpEffect } from 'src/app/core/services/model/state/mail-models/mail-models.http.effect';
import { SaveModelHttpEffect } from 'src/app/core/services/model/state/save-model/save-model.http.effect';
import { SharedModule } from 'src/app/shared/shared.module';
import { MailDocumentFormComponent } from './mail-document-form.component';
import { MissionDocumentListRoutingModule } from './mission-document-list-routing.module';
import { MissionDocumentListComponent } from './mission-document-list/mission-document-list.component';
import { FileExtensionIconPipe } from './pipes/file-extension-icon.pipe';
import { FileExtensionPipe } from './pipes/file-extension.pipe';


@NgModule({
  declarations: [
    MissionDocumentListComponent,
    MailDocumentFormComponent,
    FileExtensionIconPipe,
    FileExtensionPipe
  ],
  imports: [
    SharedModule,
    MissionDocumentListRoutingModule
  ]
})
export class MissionDocumentListModule {
  constructor(
    deleteReducer: DeleteModelReducer, 
    deleteHttpEffect: DeleteModelHttpEffect,
    mailModelsHttpEffect: MailModelsHttpEffect
  ){}
}
