import { NgModule } from '@angular/core';
import { MissionDocumentListRoutingModule } from './mission-document-list-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DocumentListComponent } from './mission-document-list/document-list/document-list.component';
import { MailDocumentSheetComponent } from './mail-document-sheet.component';
import { FileiconFromFiletypePipe } from './pipes/fileicon-from-filetype.pipe';
import { FiletypeFromUrlPipe } from './pipes/filetype-from-url.pipe';
import { MissionDocumentListComponent } from './mission-document-list/mission-document-list.component';


@NgModule({
  declarations: [
    MissionDocumentListComponent,
    DocumentListComponent,
    MailDocumentSheetComponent,
    FileiconFromFiletypePipe,
    FiletypeFromUrlPipe
  ],
  imports: [
    SharedModule,
    MissionDocumentListRoutingModule
  ]
})
export class MissionDocumentListModule { }
