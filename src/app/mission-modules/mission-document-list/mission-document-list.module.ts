import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MailDocumentFormComponent } from './mail-document-form.component';
import { MissionDocumentListRoutingModule } from './mission-document-list-routing.module';
import { DocumentListComponent } from './mission-document-list/document-list/document-list.component';
import { MissionDocumentListComponent } from './mission-document-list/mission-document-list.component';
import { FileExtensionIconPipe } from './pipes/file-extension-icon.pipe';
import { FileExtensionPipe } from './pipes/file-extension.pipe';


@NgModule({
  declarations: [
    MissionDocumentListComponent,
    DocumentListComponent,
    MailDocumentFormComponent,
    FileExtensionIconPipe,
    FileExtensionPipe
  ],
  imports: [
    SharedModule,
    MissionDocumentListRoutingModule
  ]
})
export class MissionDocumentListModule { }
