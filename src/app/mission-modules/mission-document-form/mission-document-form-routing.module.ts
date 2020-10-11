import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormToSaveModelFileStateCommandAdapter } from 'src/app/core/services/model/adapters/form-to-save-model-file-state-command.adapter';
import { ModelFormEntryComponent } from 'src/app/core/services/model/form/components/model-form-entry.component';
import { MissionDocumentFormViewComponent } from './mission-document-form-view/mission-document-form-view.component';

const routes: Routes = [
  {
    path: '',
    component: ModelFormEntryComponent,
    data: {
      viewComponent: MissionDocumentFormViewComponent, 
      adapter: FormToSaveModelFileStateCommandAdapter,
      stateProp: "missionDocuments"
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissionDocumentFormRoutingModule { }
