import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard, NoAuthGuard } from './core/services';
import { AuthComponent } from './auth/auth.component';
import { CustomPreloadingService } from './custom-preloading.service';
import { MainNavComponent } from './shared/layout';
import { PageNotFoundComponent } from './shared/components';

const routes: Routes = [

  {
    path: '', component: MainNavComponent,
    children:[
      {path: '', redirectTo: 'hjem', pathMatch: 'full'},
      {path: 'hjem', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard]},
      {path: 'profil', loadChildren: './profile/profile.module#ProfileModule'},
      {path: 'brukere', loadChildren: './users/users.module#UsersModule'},
      {path: 'data', loadChildren: './data-management/data-management.module#DataManagementModule'},
      {path: 'timer', loadChildren: './timesheet/timesheet.module#TimesheetModule'},
      {path: 'timeadministrering', loadChildren: './timesheet-admin/timesheet-admin.module#TimesheetAdminModule'},
      {path: 'timestatistikk', loadChildren: './timesheet-statistic/timesheet-statistic.module#TimesheetStatisticModule'},
      {path: 'oppdrag', loadChildren: './mission/mission.module#MissionModule'}
    ]
  },
  {path: 'login', component: AuthComponent, canActivate: [NoAuthGuard]},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  {
    preloadingStrategy: CustomPreloadingService
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
