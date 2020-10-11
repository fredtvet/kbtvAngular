import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MissionDocumentFormRoutingModule } from './mission-document-form-routing.module';
import { MissionDocumentFormViewComponent } from './mission-document-form-view/mission-document-form-view.component';

@NgModule({
    declarations: [
      MissionDocumentFormViewComponent,
    ],
    imports: [
      MissionDocumentFormRoutingModule,
      SharedModule,
    ]
  })
  export class MissionDocumentFormModule { }