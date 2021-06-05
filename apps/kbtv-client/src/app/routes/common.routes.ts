import { Breakpoints } from '@angular/cdk/layout';
import { RolePermissions } from '@core/configurations/role-permissions.const';
import { PageNotFoundComponent } from '@shared-app/components/page-not-found.component';
import { NoAuthGuard } from 'state-auth';
import { AppRoute } from '../app-routing.module';
import { HomeComponent } from '../home/home.component';

export const FeatureRoutes : AppRoute[] = [
    {path: '', redirectTo: 'hjem', pathMatch: 'full'},

    {path: 'hjem', component: HomeComponent},  

    {path: 'profil', data: {preload: false},
      loadChildren: () => import('src/app/feature-modules/profile/profile.module').then(m => m.ProfileModule)},

    {path: 'mine-timer', data: {allowedRoles: RolePermissions.UserTimesheetWeek.access}, 
      loadChildren: () => import('src/app/feature-modules/timesheet-modules/user-timesheet-week/user-timesheet-week.module').then(m => m.UserTimesheetWeekModule)},

    {path: 'oppdrag', 
      loadChildren: () => import('src/app/feature-modules/mission-modules/mission-list/mission-list.module').then(m => m.MissionListModule)},

    {path: 'brukere', data: {allowedRoles: RolePermissions.Users.access}, 
      loadChildren: () => import('src/app/feature-modules/users/users.module').then(m => m.UsersModule)},

    {path: 'data', 
      data: {
        preloadBreakpoints: [Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge],
        allowedRoles: RolePermissions.DataManagement.access
      }, 
      loadChildren: () => import('src/app/feature-modules/data-management/data-management.module').then(m => m.DataManagementModule)
    },

    {path: 'timeadministrering', data: {allowedRoles: RolePermissions.TimesheetAdmin.access},
      loadChildren: () => import('src/app/feature-modules/timesheet-modules/timesheet-admin/timesheet-admin.module').then(m => m.TimesheetAdminModule)},

    { path: 'timestatistikk', 
      data: {
        preloadBreakpoints: [Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge], 
        allowedRoles: RolePermissions.TimesheetStatistic.access
      }, 
      loadChildren: () => import('src/app/feature-modules/timesheet-modules/timesheet-statistic/timesheet-statistic.module').then(m => m.TimesheetStatisticModule)
    },
      
    {path: 'aktivitetslogg', data: {preload: false},
      loadChildren: () => import('src/app/feature-modules/request-log/request-log.module').then(m => m.RequestLogModule)},
]

export const LoginRoute: AppRoute = {
    path: 'login', canActivate: [NoAuthGuard], data: {preload: false},
    loadChildren: () => import('src/app/feature-modules/login/login.module').then(m => m.LoginModule)
};  

export const PageNotFoundRoute : AppRoute = {
    path: '**', component: PageNotFoundComponent, data: {preload: false}
};