import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserTimesheetFormEntryComponent } from './user-timesheet-form-entry.component';


const routes: Routes = [
  {
    path: '',
    component: UserTimesheetFormEntryComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserTimesheetFormRoutingModule { }
