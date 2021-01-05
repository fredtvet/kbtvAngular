import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RolePresets } from '@shared-app/enums/roles.enum';
import { CustomRoute } from '@shared-app/interfaces/custom-route.interface';
import { AuthGuard, AuthRouteData, NoAuthGuard } from 'state-auth';
import { RolePreloadService } from './core/services/role-preload.service';
import { HomeComponent } from './home/home.component';
import { MainNavComponent } from './layout/main-nav/main-nav.component';
import { PageNotFoundComponent } from './shared-app/components/page-not-found.component';

interface AppRoute extends CustomRoute<AuthRouteData>{}

const routes: AppRoute[] = [
  {
    path: '', component: MainNavComponent, canActivateChild: [AuthGuard],
    children:[
      {path: '', redirectTo: 'hjem', pathMatch: 'full'},

      {path: 'hjem', component: HomeComponent},  

      {path: 'profil',
        loadChildren: () => import('src/app/feature-modules/profile/profile.module').then(m => m.ProfileModule)},

      {path: 'mine-timer', data: {allowedRoles: RolePresets.Internal}, 
        loadChildren: () => import('src/app/feature-modules/timesheet-modules/user-timesheet-week/user-timesheet-week.module').then(m => m.UserTimesheetWeekModule)},

      {path: 'oppdrag', 
        loadChildren: () => import('src/app/feature-modules/mission-modules/mission-list/mission-list.module').then(m => m.MissionListModule)},

      {path: 'brukere', data: {allowedRoles: RolePresets.Authority}, 
        loadChildren: () => import('src/app/feature-modules/users/users.module').then(m => m.UsersModule)},

      {path: 'data', data: {allowedRoles: RolePresets.Authority}, 
        loadChildren: () => import('src/app/feature-modules/data-management/data-management.module').then(m => m.DataManagementModule)},

      {path: 'timeadministrering', data: {allowedRoles: RolePresets.Authority},
        loadChildren: () => import('src/app/feature-modules/timesheet-modules/timesheet-admin/timesheet-admin.module').then(m => m.TimesheetAdminModule)},

      {path: 'timestatistikk', data: {allowedRoles: RolePresets.Authority}, 
        loadChildren: () => import('src/app/feature-modules/timesheet-modules/timesheet-statistic/timesheet-statistic.module').then(m => m.TimesheetStatisticModule)},
    ],
  },
  
  {path: 'login', canActivate: [NoAuthGuard], 
    loadChildren: () => import('src/app/feature-modules/login-prompt/login-prompt.module').then(m => m.LoginPromptModule)},   

  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  {
    preloadingStrategy: RolePreloadService,
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
