import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MissionDocumentFormRoutingModule } from './mission-document-form-routing.module';
import { ModelFormStore } from 'src/app/core/services/model/form/model-form.store';
import { SaveModelFileToStateHttpConverter } from 'src/app/core/services/model/converters/save-model-file-to-state-http.converter';
import { SaveModelToStateHttpConverter } from 'src/app/core/services/model/converters/save-model-to-state-http.converter';
import { MissionDocumentFormViewComponent } from './mission-document-form-view/mission-document-form-view.component';

@NgModule({
    declarations: [
      MissionDocumentFormViewComponent,
    ],
    providers:[
      ModelFormStore,
      {provide: SaveModelToStateHttpConverter, useExisting: SaveModelFileToStateHttpConverter}
    ],
    imports: [
      MissionDocumentFormRoutingModule,
      SharedModule,
    ]
  })
  export class MissionDocumentFormModule { }