import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MissionDocumentListComponent } from './mission-document-list/mission-document-list.component';

const routes: Routes = [
  {
    path: '',
    component: MissionDocumentListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissionDocumentListRoutingModule { }
