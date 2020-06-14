import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimesheetWeekViewComponent } from './timesheet-week-view/timesheet-week-view.component';
import { TimesheetListComponent } from './timesheet-list/timesheet-list.component';
import { TimesheetWeekListComponent } from './timesheet-week-list/timesheet-week-list.component';
import { Roles, AppPages } from 'src/app/shared-app/enums';
import { AuthGuard } from 'src/app/core/services';


const routes: Routes = [
  {path: '', redirectTo: 'ukevisning', pathMatch: 'full'},
  {
    path: 'ukevisning',
    component: TimesheetWeekViewComponent,
    canActivate: [AuthGuard],
    data: {allowedRoles: [Roles.Leder, Roles.Mellomleder, Roles.Ansatt], page: AppPages.TimesheetWeekView},
    children: [
      {path: 'skjema', loadChildren: () => import('src/app/timesheet-modules/timesheet-user-modules/timesheet-form/timesheet-form.module').then(m => m.TimesheetFormModule),
        data: {preload: true, page: AppPages.TimesheetForm}},
    ],
  },
  {
    path: 'ukeliste',
    component: TimesheetWeekListComponent,
    canActivate: [AuthGuard],
    data: {allowedRoles: [Roles.Leder, Roles.Mellomleder, Roles.Ansatt], page: AppPages.TimesheetWeekList},
  },
  {
    path: 'liste',
    component: TimesheetListComponent,
    canActivate: [AuthGuard],
    data: {allowedRoles: [Roles.Leder, Roles.Mellomleder, Roles.Ansatt], page: AppPages.TimesheetList},
    children: [
      {path: 'skjema', loadChildren: () => import('src/app/timesheet-modules/timesheet-user-modules/timesheet-form/timesheet-form.module').then(m => m.TimesheetFormModule)},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TimesheetRoutingModule { }
