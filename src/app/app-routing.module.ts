import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, NoAuthGuard, RolePreloadService } from './core/services';
import { HomeComponent } from './home/home.component';
import { MainNavComponent } from './layout/main-nav/main-nav.component';
import { PageNotFoundComponent } from './shared-app/components';
import { AppPages, RolePresets } from './shared-app/enums';

const routes: Routes = [
  //{path: '', component: LoginPageComponent, canActivate: [NoAuthGuard]},
  {
    path: '', component: MainNavComponent,
    children:[
      {path: '', redirectTo: 'hjem', pathMatch: 'full'},
      {path: 'hjem', component: HomeComponent, canActivate: [AuthGuard], data: {page: AppPages.Home}},

      {path: 'profil', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule), 
        canActivateChild: [AuthGuard], data: {preload: true, page: AppPages.Profile}},

      {path: 'mine-timer', loadChildren: () => import('./timesheet-modules/user-timesheet-list/user-timesheet-list.module').then(m => m.UserTimesheetListModule), 
        canActivateChild: [AuthGuard], data: {preload: true, page: AppPages.Timesheet}},

      {path: 'oppdrag', loadChildren: () => import('./mission-modules/mission-list/mission-list.module').then(m => m.MissionListModule),
        canActivateChild: [AuthGuard], data: {preload: true, page: AppPages.Mission}},

      {path: 'brukere', loadChildren: () => import('./users/users.module').then(m => m.UsersModule), 
        canActivateChild: [AuthGuard], data: {preload: true, allowedRoles: RolePresets.Authority, page: AppPages.Users}},

      {path: 'data', loadChildren: () => import('./data-management/data-management.module').then(m => m.DataManagementModule), 
        canActivateChild: [AuthGuard], data: {preload: true, allowedRoles: RolePresets.Authority, page: AppPages.DataManagement}},

      {path: 'timeadministrering', loadChildren: () => import('./timesheet-modules/timesheet-admin/timesheet-admin.module').then(m => m.TimesheetAdminModule), 
        canActivateChild: [AuthGuard], data: {preload: true, allowedRoles: RolePresets.Authority, page: AppPages.TimesheetAdmin}},

      {path: 'timestatistikk', loadChildren: () => import('./timesheet-modules/timesheet-statistic/timesheet-statistic.module').then(m => m.TimesheetStatisticModule), 
        canActivateChild: [AuthGuard], data: {preload: true, allowedRoles: RolePresets.Authority, page: AppPages.TimesheetStatistic}},
    ]
  },
  {path: 'login', loadChildren: () => import('./login-prompt/login-prompt.module').then(m => m.LoginPromptModule),
    canActivate: [NoAuthGuard], data: {preload: true, page: AppPages.Login}},

  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  {
    preloadingStrategy: RolePreloadService
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
