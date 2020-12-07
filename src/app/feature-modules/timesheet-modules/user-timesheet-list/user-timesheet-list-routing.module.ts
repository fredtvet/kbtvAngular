import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTimesheetListComponent } from './user-timesheet-list/user-timesheet-list.component';

const routes: Routes = [
  {
    path: '',
    component: UserTimesheetListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserTimesheetListRoutingModule { }
