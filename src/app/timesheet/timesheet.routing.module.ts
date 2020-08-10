import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/services';
import { RolePresets, AppPages } from '../shared-app/enums';


const routes: Routes = [
  {path: '', redirectTo: 'administrering', pathMatch: 'full'},
  {path: 'administrering', loadChildren: () => import('./timesheet-admin/timesheet-admin.module').then(m => m.TimesheetAdminModule), 
    canActivate: [AuthGuard], data: {preload: true, allowedRoles: RolePresets.Authority, page: AppPages.TimesheetAdmin}},

  {path: 'statistikk', loadChildren: () => import('./timesheet-statistic/timesheet-statistic.module').then(m => m.TimesheetStatisticModule), 
    canActivate: [AuthGuard], data: {preload: true, allowedRoles: RolePresets.Authority, page: AppPages.TimesheetStatistic}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TimesheetRoutingModule { }
