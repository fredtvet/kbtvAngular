import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimesheetAdminListComponent } from './timesheet-admin-list/timesheet-admin-list.component';
import { TimesheetAdminUserListComponent } from './timesheet-admin-user-list/timesheet-admin-user-list.component';
import { TimesheetAdminWeekListComponent } from './timesheet-admin-week-list/timesheet-admin-week-list.component';

const routes: Routes = [
  {
    path: '',
    component: TimesheetAdminUserListComponent,
    data: {depth: 2},
  },  
  {
    path: 'uker',
    component: TimesheetAdminWeekListComponent,
    data: {depth: 3},
  },
  {
    path: 'uker/timer',
    component: TimesheetAdminListComponent,
    data: {depth: 4},
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimesheetAdminRoutingModule { }
