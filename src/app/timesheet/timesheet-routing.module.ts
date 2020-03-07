import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimesheetWeekListComponent } from './timesheet-week-list/timesheet-week-list.component';
import { AuthGuard } from '../core';
import { ROLES } from '../shared/roles.enum';
import { TimesheetDetailsComponent } from './timesheet-details/timesheet-details.component';


const routes: Routes = [
  {
    path: '',
    component: TimesheetWeekListComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {allowedRoles: [ROLES.Leder, ROLES.Mellomleder, ROLES.Ansatt]}
  },
  {
    path: ':year/:weekNr/:weekDay/detaljer',
    component: TimesheetDetailsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {allowedRoles: [ROLES.Leder, ROLES.Mellomleder, ROLES.Ansatt]}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TimesheetRoutingModule { }
