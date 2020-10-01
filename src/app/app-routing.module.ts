import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, NoAuthGuard } from './core/services/auth';
import { RolePreloadService } from './core/services/role-preload.service';
import { HomeComponent } from './home/home.component';
import { MainNavComponent } from './layout/main-nav/main-nav.component';
import { PageNotFoundComponent } from './shared-app/components/page-not-found.component';
import { RolePresets } from './shared-app/enums';

const routes: Routes = [
  {
    path: '', component: MainNavComponent, canActivateChild: [AuthGuard],
    children:[
      {path: '', redirectTo: 'hjem', pathMatch: 'full'},

      {path: 'hjem',     component: HomeComponent,
       data: {depth: 1}},  

      {path: 'profil', data: {depth: 2}, 
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)},

      {path: 'mine-timer', data: {depth: 2, allowedRoles: RolePresets.Internal}, 
        loadChildren: () => import('./timesheet-modules/user-timesheet-list/user-timesheet-list.module').then(m => m.UserTimesheetListModule)},

      {path: 'oppdrag', loadChildren: () => import('./mission-modules/mission-list/mission-list.module').then(m => m.MissionListModule),
        data: {depth: 1}},

      {path: 'brukere', data: {depth: 2, allowedRoles: RolePresets.Authority}, 
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)},

      {path: 'data', data: {depth: 2, allowedRoles: RolePresets.Authority}, 
        loadChildren: () => import('./data-management/data-management.module').then(m => m.DataManagementModule)},

      {path: 'timeadministrering', data: {depth: 2, allowedRoles: RolePresets.Authority},
        loadChildren: () => import('./timesheet-modules/timesheet-admin/timesheet-admin.module').then(m => m.TimesheetAdminModule)},

      {path: 'timestatistikk', data: {depth: 2, allowedRoles: RolePresets.Authority}, 
        loadChildren: () => import('./timesheet-modules/timesheet-statistic/timesheet-statistic.module').then(m => m.TimesheetStatisticModule)},
    ],
  },
  
  {path: 'login', canActivate: [NoAuthGuard], data: {depth: 0}, 
    loadChildren: () => import('./login-prompt/login-prompt.module').then(m => m.LoginPromptModule)},   

  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  {
      preloadingStrategy: RolePreloadService
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
