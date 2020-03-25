import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimesheetWeekListComponent } from './timesheet-week-list/timesheet-week-list.component';
import { AuthGuard } from '../core/services';
import { TimesheetDetailsComponent } from './timesheet-details/timesheet-details.component';
import { Roles } from '../shared/enums';


const routes: Routes = [
  {
    path: 'uker',
    component: TimesheetWeekListComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {allowedRoles: [Roles.Leder, Roles.Mellomleder, Roles.Ansatt]}
  },
  {
    path: 'ny',
    component: TimesheetDetailsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {allowedRoles: [Roles.Leder, Roles.Mellomleder, Roles.Ansatt]}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TimesheetRoutingModule { }
