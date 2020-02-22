import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataManagerComponent } from './data-manager/data-manager.component';
import { AuthGuard } from '../core';
import { ROLES } from '../shared';


const routes: Routes = [
  {
    path: '',
    component: DataManagerComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {allowedRoles: [ROLES.Leder]}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataManagementRoutingModule {

}
