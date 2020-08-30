import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimesheetAdminListComponent } from './timesheet-admin-list/timesheet-admin-list.component';
import { TimesheetAdminUserListComponent } from './timesheet-admin-user-list/timesheet-admin-user-list.component';
import { AppPages } from 'src/app/shared-app/enums/app-pages.enum';
import { Roles } from 'src/app/shared-app/enums';
import { TimesheetAdminWeekListComponent } from './timesheet-admin-week-list/timesheet-admin-week-list.component';

const routes: Routes = [
  {
    path: '',
    component: TimesheetAdminUserListComponent,
    data: {allowedRoles: [Roles.Leder], page: AppPages.TimesheetAdminUserList}
  },  
  {
    path: 'uker',
    component: TimesheetAdminWeekListComponent,
    data: {allowedRoles: [Roles.Leder], page: AppPages.TimesheetAdminWeekList}
  },
  {
    path: 'uker/timer',
    component: TimesheetAdminListComponent,
    data: {allowedRoles: [Roles.Leder], page: AppPages.TimesheetAdminList}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimesheetAdminRoutingModule { }
