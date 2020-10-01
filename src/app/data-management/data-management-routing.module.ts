import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataManagerComponent } from './data-manager/data-manager.component';
import { RolePresets, Roles } from '../shared-app/enums';


const routes: Routes = [
  {
    path: '',
    component: DataManagerComponent,
    data: {allowedRoles: RolePresets.Authority},
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
