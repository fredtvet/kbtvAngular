import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MissionDocumentListComponent } from './mission-document-list/mission-document-list.component';
import { AuthGuard } from 'src/app/core/services';
import { Roles } from 'src/app/shared-app/enums';


const routes: Routes = [
  {
    path: '',
    component: MissionDocumentListComponent,
    children: [
      {path: 'skjema', canActivate: [AuthGuard], data: {allowedRoles: [Roles.Leder]}, 
      loadChildren: () => import('src/app/mission-modules/mission-document-form/mission-document-form.module').then(m => m.MissionDocumentFormModule)},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissionDocumentListRoutingModule { }
