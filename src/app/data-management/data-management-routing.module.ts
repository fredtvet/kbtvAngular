import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataManagerComponent } from './data-manager/data-manager.component';
import { AuthGuard } from '../core/services';
import { Roles } from '../shared-app/enums';


const routes: Routes = [
  {
    path: '',
    component: DataManagerComponent,
    data: {allowedRoles: [Roles.Leder]},
    children: [
      {path: 'ny/oppdrag', loadChildren: () => import('src/app/mission-modules/mission-form/mission-form.module').then(m => m.MissionFormModule)},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataManagementRoutingModule {

}
