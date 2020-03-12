import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard, NoAuthGuard } from './core/services';
import { AuthComponent } from './auth/auth.component';
import { CustomPreloadingService } from './custom-preloading.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'hjem',
    pathMatch: 'full',
  },
  {
    path: 'hjem',
    component: HomeComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: AuthComponent,
    pathMatch: 'full',
    canActivate: [NoAuthGuard]
  },
  {
    path: 'profil',
    loadChildren: './profile/profile.module#ProfileModule'
  },
  {
    path: 'oppdragsgivere',
    loadChildren: './employer/employer.module#EmployerModule'
  },
  {
    path: 'brukere',
    loadChildren: './users/users.module#UsersModule'
  },
  {
    path: 'data',
    loadChildren: './data-management/data-management.module#DataManagementModule'
  },
  {
    path: 'timeliste',
    loadChildren: './timesheet/timesheet.module#TimesheetModule'
  },
  {
    path: 'oppdrag',
    data: {preload: true },
    loadChildren: './mission/mission.module#MissionModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  {
    preloadingStrategy: CustomPreloadingService
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
