import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTimesheetWeekComponent } from './user-timesheet-week/user-timesheet-week.component';


const routes: Routes = [
  {
    path: '',
    component: UserTimesheetWeekComponent,
    data: {child: true},
    children: [
      {
        path: 'liste', data: {child: true},
        loadChildren: () => import('src/app/feature-modules/timesheet-modules/user-timesheet-list/user-timesheet-list.module').then(m => m.UserTimesheetListModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserTimesheetWeekRoutingModule { }
