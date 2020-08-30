import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Roles } from 'src/app/shared-app/enums';
import { AppPages } from 'src/app/shared-app/enums/app-pages.enum';
import { UserTimesheetWeekViewComponent } from './user-timesheet-week-view/user-timesheet-week-view.component';
import { UserTimesheetWeekListComponent } from './user-timesheet-week-list/user-timesheet-week-list.component';
import { UserTimesheetListComponent } from './user-timesheet-list/user-timesheet-list.component';


const routes: Routes = [
  {path: '', redirectTo: 'ukevisning', pathMatch: 'full'},
  {
    path: 'ukevisning',
    component: UserTimesheetWeekViewComponent,
    data: {allowedRoles: [Roles.Leder, Roles.Mellomleder, Roles.Ansatt], page: AppPages.TimesheetWeekView},
    children: [
      {path: 'skjema', loadChildren: () => import('src/app/timesheet-modules/user-timesheet-form/user-timesheet-form.module').then(m => m.UserTimesheetFormModule),
        data: {preload: true, page: AppPages.TimesheetForm}},
    ],
  },
  {
    path: 'ukeliste',
    component: UserTimesheetWeekListComponent,
    data: {allowedRoles: [Roles.Leder, Roles.Mellomleder, Roles.Ansatt], page: AppPages.TimesheetWeekList},
  },
  {
    path: 'liste',
    component: UserTimesheetListComponent,
    data: {allowedRoles: [Roles.Leder, Roles.Mellomleder, Roles.Ansatt], page: AppPages.TimesheetList},
    children: [
      {path: 'skjema', loadChildren: () => import('src/app/timesheet-modules/user-timesheet-form/user-timesheet-form.module').then(m => m.UserTimesheetFormModule)},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserTimesheetListRoutingModule { }
