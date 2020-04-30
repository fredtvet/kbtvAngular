import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimesheetWeekViewComponent } from './timesheet-week-view/timesheet-week-view.component';
import { AuthGuard } from '../core/services';
import { Roles } from '../shared/enums';
import { TimesheetListComponent } from './timesheet-list/timesheet-list.component';
import { TimesheetWeekListComponent } from './timesheet-week-list/timesheet-week-list.component';


const routes: Routes = [
  {
    path: 'ukeliste',
    component: TimesheetWeekListComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {allowedRoles: [Roles.Leder, Roles.Mellomleder, Roles.Ansatt]}
  },
  {
    path: 'ukevisning',
    component: TimesheetWeekViewComponent,
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
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TimesheetRoutingModule { }
