import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolePresets } from '../shared-app/enums';
import { DataManagerComponent } from './data-manager/data-manager.component';


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
