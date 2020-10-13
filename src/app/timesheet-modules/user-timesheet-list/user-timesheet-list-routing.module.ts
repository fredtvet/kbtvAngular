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
    data: {depth: 1},
  },
  {
    path: 'ukevisning',
    component: UserTimesheetWeekComponent,
    data: {depth: 2},
  },
  {
    path: 'liste',
    component: UserTimesheetListComponent,
    data: {depth: 3},
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserTimesheetListRoutingModule { }
