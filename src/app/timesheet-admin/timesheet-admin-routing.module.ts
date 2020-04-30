import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/services';
import { Roles } from '../shared/enums';
import { TimesheetYearListComponent } from './timesheet-year-list/timesheet-year-list.component';
import { TimesheetWeekListComponent } from './timesheet-week-list/timesheet-week-list.component';

const routes: Routes = [
  {
    path: '',
    component: TimesheetYearListComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {allowedRoles: [Roles.Leder]}
  },
  {
    path: 'ukeliste',
    component: TimesheetWeekListComponent,
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
