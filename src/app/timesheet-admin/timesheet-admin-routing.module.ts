import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/services';
import { Roles } from '../shared-app/enums';
import { TimesheetAdminListComponent } from './timesheet-admin-list/timesheet-admin-list.component';
import { TimesheetAdminUserListComponent } from './timesheet-admin-user-list/timesheet-admin-user-list.component';

const routes: Routes = [
  {
    path: '',
    component: TimesheetAdminUserListComponent,
    canActivate: [AuthGuard],
    data: {allowedRoles: [Roles.Leder], animation: 'TimesheetAdminUserList'}
  },  
  {
    path: ':userName/:year',
    component: TimesheetAdminListComponent,
    canActivate: [AuthGuard],
    data: {allowedRoles: [Roles.Leder], animation: 'TimesheetAdminList'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimesheetAdminRoutingModule { }
