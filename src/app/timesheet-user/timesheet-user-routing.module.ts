import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppPages } from 'src/app/shared-app/enums';
import { AuthGuard } from 'src/app/core/services';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('src/app/timesheet-user/timesheet-list/timesheet-list.module').then(m => m.TimesheetListModule),
    canActivate: [AuthGuard],data: {preload: true, page: AppPages.MissionList}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TimesheetUserRoutingModule { }
