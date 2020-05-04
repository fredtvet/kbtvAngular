import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataManagerComponent } from './data-manager/data-manager.component';
import { AuthGuard } from '../core/services';
import { Roles } from '../shared/enums';
import { EmployerFormComponent } from './employer-form/employer-form.component';


const routes: Routes = [
  {
    path: '',
    component: DataManagerComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {allowedRoles: [Roles.Leder]}
  },
  {
    path: 'oppdragsgivere/ny',
    component: EmployerFormComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {allowedRoles: [Roles.Leder, Roles.Mellomleder]}
  },
  {
    path: 'oppdragsgivere/:id/rediger',
    component: EmployerFormComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {allowedRoles: [Roles.Leder]}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataManagementRoutingModule {

}
