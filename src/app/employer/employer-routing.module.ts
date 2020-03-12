import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Roles } from '../shared/enums';
import { AuthGuard } from '../core/services';
import { EmployerListComponent } from './employer-list/employer-list.component';
import { EmployerFormComponent } from './employer-form/employer-form.component';


const routes: Routes = [
  {
    path: '',
    component: EmployerListComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {allowedRoles: [Roles.Leder, Roles.Mellomleder]}
  },
  {
    path: 'ny',
    component: EmployerFormComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {allowedRoles: [Roles.Leder, Roles.Mellomleder]}
  },
  {
    path: ':id/rediger',
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
export class EmployerRoutingModule { }
