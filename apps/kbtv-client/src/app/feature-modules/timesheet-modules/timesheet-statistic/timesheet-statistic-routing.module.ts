import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimesheetStatisticComponent } from './timesheet-statistic/timesheet-statistic.component';


const routes: Routes = [
  {
    path: '', data: {disableMaxWidth: true, viewType: "card"},
    component: TimesheetStatisticComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TimesheetStatisticRoutingModule { }
