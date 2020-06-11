import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PasswordFormComponent } from './password-form/password-form.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { ConfirmDialogComponent } from '../shared/components';


@NgModule({
  declarations: [
    PasswordFormComponent,
    ProfileComponent,
    ProfileFormComponent
  ],
  imports: [
    SharedModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
