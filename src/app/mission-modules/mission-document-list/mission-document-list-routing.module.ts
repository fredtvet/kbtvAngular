import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MissionDocumentListComponent } from './mission-document-list/mission-document-list.component';
import { RolePresets } from 'src/app/shared-app/enums';


const routes: Routes = [
  {
    path: '',
    component: MissionDocumentListComponent,
    children: [
      {path: 'skjema', data: {allowedRoles: RolePresets.Authority}, 
      loadChildren: () => import('src/app/mission-modules/mission-document-form/mission-document-form.module').then(m => m.MissionDocumentFormModule)},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissionDocumentListRoutingModule { }
