import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/services';
import { Roles } from '../shared/enums';
import { TimesheetAdminListComponent } from './timesheet-admin-list/timesheet-admin-list.component';

const routes: Routes = [
  {
    path: '',
    component: TimesheetAdminListComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {allowedRoles: [Roles.Leder]}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimesheetAdminRoutingModule { }
