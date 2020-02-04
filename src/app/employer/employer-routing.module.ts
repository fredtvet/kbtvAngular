import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainNavComponent, BottomNavComponent, ROLES } from '../shared';
import { AuthGuard } from '../core';
import { EmployerListComponent } from './employer-list/employer-list.component';


const routes: Routes = [
  {
    path: '',
    component: EmployerListComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {allowedRoles: [ROLES.Leder, ROLES.Mellomleder]}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerRoutingModule { }
