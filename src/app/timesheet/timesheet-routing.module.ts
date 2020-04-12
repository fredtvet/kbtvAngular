import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimesheetWeekListComponent } from './timesheet-week-list/timesheet-week-list.component';
import { AuthGuard } from '../core/services';
import { Roles } from '../shared/enums';
import { TimesheetListComponent } from './timesheet-list/timesheet-list.component';


const routes: Routes = [
  {
    path: '',
    component: TimesheetWeekListComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {allowedRoles: [Roles.Leder, Roles.Mellomleder, Roles.Ansatt]}
  },
  {
    path: 'liste',
    component: TimesheetListComponent,
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
