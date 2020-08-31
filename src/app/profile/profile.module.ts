import { NgModule } from '@angular/core';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { PasswordFormComponent } from './password-form/password-form.component';
import { PasswordFormViewComponent } from './password-form/password-form-view/password-form-view.component';
import { ProfileFormViewComponent } from './profile-form/profile-form-view/profile-form-view.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { PasswordFormWrapperComponent } from './password-form/password-form-wrapper.component';
import { ProfileFormWrapperComponent } from './profile-form/profile-form-wrapper.component';
import { AppConfigFormComponent } from './settings/app-config-form/app-config-form.component';

@NgModule({
  declarations: [
    ProfileComponent,    
    ProfileFormWrapperComponent,
    ProfileFormComponent,
    ProfileFormViewComponent,
    PasswordFormWrapperComponent,
    PasswordFormComponent,
    PasswordFormViewComponent,
    SettingsComponent,
    AppConfigFormComponent
  ],
  imports: [
    SharedModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { constructor(){ console.log('ProfileModule')} }
