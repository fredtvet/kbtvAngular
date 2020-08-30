import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { AppPages } from 'src/app/shared-app/enums/app-pages.enum';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    data: {page: AppPages.Profile}
  },
  {
    path: 'innstillinger',
    component: SettingsComponent,
    data: {page: AppPages.Settings}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
