import { NgModule } from '@angular/core';

import { MissionDocumentFormRoutingModule } from './mission-document-form-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { MissionDocumentFormEntryComponent } from './mission-document-form-entry.component';
import { MissionDocumentFormComponent } from './mission-document-form/mission-document-form.component';
import { MissionDocumentFormViewComponent } from './mission-document-form/mission-document-form-view/mission-document-form-view.component';
import { MissionDocumentFormSheetWrapperComponent } from './mission-document-form/mission-document-form-sheet-wrapper.component';


@NgModule({
  declarations: [
    MissionDocumentFormEntryComponent,
    MissionDocumentFormSheetWrapperComponent,
    MissionDocumentFormComponent,
    MissionDocumentFormViewComponent,
  ],
  entryComponents:[
    MissionDocumentFormSheetWrapperComponent
  ],
  imports: [
    MissionDocumentFormRoutingModule,
    SharedModule,
  ]
})
export class MissionDocumentFormModule { }
