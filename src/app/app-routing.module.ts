import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard, NoAuthGuard } from './core/services';
import { HomeComponent } from './home/home.component';
import { MainNavComponent } from './layout/main-nav/main-nav.component';
import { PageNotFoundComponent } from './shared-app/components';
import { RolePresets } from './shared-app/enums';

const routes: Routes = [
  //{path: '', component: LoginPageComponent, canActivate: [NoAuthGuard]},
  {
    path: '', component: MainNavComponent,
    children:[
      {path: '', redirectTo: 'hjem', pathMatch: 'full'},
      {path: 'hjem', component: HomeComponent, canActivate: [AuthGuard], data: {animation: 'Home'}},

      {path: 'profil', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule), 
        canActivate: [AuthGuard], data: {animation: 'Profile'}},

      {path: 'timer', loadChildren: () => import('./timesheet-modules/timesheet-user-modules/timesheet/timesheet.module').then(m => m.TimesheetModule), 
        canActivate: [AuthGuard]},

      {path: 'oppdrag', loadChildren: () => import('./mission-modules/mission/mission.module').then(m => m.MissionModule),
        canActivate: [AuthGuard]},

      {path: 'brukere', loadChildren: () => import('./users/users.module').then(m => m.UsersModule), 
        canActivate: [AuthGuard], data: {allowedRoles: RolePresets.Authority, animation: 'Users'}},

      {path: 'data', loadChildren: () => import('./data-management/data-management.module').then(m => m.DataManagementModule), 
        canActivate: [AuthGuard], data: {allowedRoles: RolePresets.Authority, animation: 'DataManagement'}},

      {path: 'timeadministrering', loadChildren: () => import('./timesheet-modules/timesheet-admin/timesheet-admin.module').then(m => m.TimesheetAdminModule), 
        canActivate: [AuthGuard], data: {allowedRoles: RolePresets.Authority}},

      {path: 'timestatistikk', loadChildren: () => import('./timesheet-modules/timesheet-statistic/timesheet-statistic.module').then(m => m.TimesheetStatisticModule), 
        canActivate: [AuthGuard], data: {allowedRoles: RolePresets.Authority, animation: 'TimesheetStatistic'}},

      {path: 'login', canActivate: [NoAuthGuard], loadChildren: () => import('./login-prompt/login-prompt.module').then(m => m.LoginPromptModule)},
    ]
  },
  //{path: 'login', component: LoginPageComponent, canActivate: [NoAuthGuard]},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
