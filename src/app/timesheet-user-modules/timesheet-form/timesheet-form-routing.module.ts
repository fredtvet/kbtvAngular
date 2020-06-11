import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimesheetFormEntryComponent } from './timesheet-form-entry.component';


const routes: Routes = [
  {
    path: '',
    component: TimesheetFormEntryComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimesheetFormRoutingModule { }
