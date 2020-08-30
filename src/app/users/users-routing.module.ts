import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { Roles } from '../shared-app/enums';


const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    data: {allowedRoles: [Roles.Leder, Roles.Mellomleder]}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
