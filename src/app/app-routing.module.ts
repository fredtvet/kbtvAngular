import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPages } from './shared-app/enums/app-pages.enum';
import { PageNotFoundComponent } from './shared-app/components/page-not-found.component';
import { AuthGuard, NoAuthGuard } from './core/services/auth';
import { MainNavComponent } from './layout/main-nav/main-nav.component';
import { RolePresets } from './shared-app/enums';
import { RolePreloadService } from './core/services';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '', component: MainNavComponent, canActivateChild: [AuthGuard],
    children:[
      {path: '', redirectTo: 'hjem', pathMatch: 'full'},

      {path: 'hjem',     component: HomeComponent,
       data: {preload: true, page: AppPages.Home}},  

      {path: 'profil', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule), 
        data: {preload: true, page: AppPages.Profile}},

      {path: 'mine-timer', loadChildren: () => import('./timesheet-modules/user-timesheet-list/user-timesheet-list.module').then(m => m.UserTimesheetListModule), 
        data: {preload: true, allowedRoles: RolePresets.Internal, page: AppPages.Timesheet}},

      {path: 'oppdrag', loadChildren: () => import('./mission-modules/mission-list/mission-list.module').then(m => m.MissionListModule),
        data: {preload: true, page: AppPages.Mission}},

      {path: 'brukere', loadChildren: () => import('./users/users.module').then(m => m.UsersModule), 
        data: {preload: true, allowedRoles: RolePresets.Authority, page: AppPages.Users}},

      {path: 'data', loadChildren: () => import('./data-management/data-management.module').then(m => m.DataManagementModule), 
        data: {preload: true, allowedRoles: RolePresets.Authority, page: AppPages.DataManagement}},

      {path: 'timeadministrering', loadChildren: () => import('./timesheet-modules/timesheet-admin/timesheet-admin.module').then(m => m.TimesheetAdminModule), 
        data: {preload: true, allowedRoles: RolePresets.Authority, page: AppPages.TimesheetAdmin}},

      {path: 'timestatistikk', loadChildren: () => import('./timesheet-modules/timesheet-statistic/timesheet-statistic.module').then(m => m.TimesheetStatisticModule), 
        data: {preload: true, allowedRoles: RolePresets.Authority, page: AppPages.TimesheetStatistic}},
    ],
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
