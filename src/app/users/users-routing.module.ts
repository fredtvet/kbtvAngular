import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainNavComponent, BottomNavComponent } from '../shared';
import { AuthGuard } from '../core';
import { UserListComponent } from './user-list/user-list.component';
import { ROLES } from '../shared/roles.enum';
import { UserFormComponent } from './user-form/user-form.component';


const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {allowedRoles: [ROLES.Leder, ROLES.Mellomleder]}
  },
  {
    path: 'ny',
    component: UserFormComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {allowedRoles: [ROLES.Leder]}
  },
  {
    path: ':userName/rediger',
    component: UserFormComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {allowedRoles: [ROLES.Leder]}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
