import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './core';
import { AuthComponent } from './auth/auth.component';
import { CustomPreloadingService } from './custom-preloading.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'hjem',
    pathMatch: 'full'
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
