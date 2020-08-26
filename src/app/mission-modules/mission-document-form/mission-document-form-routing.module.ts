import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MissionDocumentFormEntryComponent } from './mission-document-form-entry.component';


const routes: Routes = [
  {
    path: '',
    component: MissionDocumentFormEntryComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissionDocumentFormRoutingModule { }
