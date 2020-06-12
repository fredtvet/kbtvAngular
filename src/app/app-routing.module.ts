import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, NoAuthGuard } from './core/services';
import { CustomPreloadingService } from './custom-preloading.service';
import { MainNavComponent } from './shared/layout';
import { PageNotFoundComponent } from './shared/components';
import { LoginPageComponent } from './login-page.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  //{path: '', component: LoginPageComponent, canActivate: [NoAuthGuard]},
  {
    path: '', component: MainNavComponent,
    children:[
      {path: '', redirectTo: 'hjem', pathMatch: 'full'},
      {path: 'hjem', component: HomeComponent, canActivate: [AuthGuard], data: {animation: 'Home'}},
      {path: 'profil', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule), 
        data: {animation: 'Profile'}},
      {path: 'brukere', loadChildren: () => import('./users/users.module').then(m => m.UsersModule), 
        data: {animation: 'Users'}},
      {path: 'data', loadChildren: () => import('./data-management/data-management.module').then(m => m.DataManagementModule), 
        data: {animation: 'DataManagement'}},
      {path: 'timer', loadChildren: () => import('./timesheet-user-modules/timesheet/timesheet.module').then(m => m.TimesheetModule), 
        data: {animation: 'Timesheet'}},
      {path: 'timeadministrering', loadChildren: () => import('./timesheet-admin/timesheet-admin.module').then(m => m.TimesheetAdminModule), 
        data: {animation: 'TimesheetAdmin'}},
      {path: 'timestatistikk', loadChildren: () => import('./timesheet-statistic/timesheet-statistic.module').then(m => m.TimesheetStatisticModule), 
        data: {animation: 'TimesheetStatistic'}},
      {path: 'oppdrag', loadChildren: () => import('./mission-modules/mission/mission.module').then(m => m.MissionModule), 
        }
    ]
  },
  {path: 'login', component: LoginPageComponent, canActivate: [NoAuthGuard]},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  {
    preloadingStrategy: CustomPreloadingService
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
