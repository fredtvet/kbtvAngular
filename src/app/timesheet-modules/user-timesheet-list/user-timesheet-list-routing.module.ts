import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTimesheetListComponent } from './user-timesheet-list/user-timesheet-list.component';
import { UserTimesheetWeekListComponent } from './user-timesheet-week-list/user-timesheet-week-list.component';
import { UserTimesheetWeekComponent } from './user-timesheet-week/user-timesheet-week.component';


const routes: Routes = [
  {path: '', redirectTo: 'ukevisning', pathMatch: 'full'},
  {
    path: 'ukeliste', 
    component: UserTimesheetWeekListComponent,
    data: {depth: 2},
  },
  {
    path: 'ukevisning',
    component: UserTimesheetWeekComponent,
    data: {depth: 3},
    children: [
      {path: 'skjema', loadChildren: () => import('src/app/timesheet-modules/user-timesheet-form/user-timesheet-form.module')
        .then(m => m.UserTimesheetFormModule)}
    ],
  },
  {
    path: 'liste',
    component: UserTimesheetListComponent,
    data: {depth: 4},
    children: [
      {path: 'skjema', loadChildren: () => import('src/app/timesheet-modules/user-timesheet-form/user-timesheet-form.module')
        .then(m => m.UserTimesheetFormModule)},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserTimesheetListRoutingModule { }
