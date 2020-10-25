import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { UpdateCurrentUserHttpEffect } from './state/update-current-user/update-current-user.http.effect';
import { UpdateCurrentUserReducer } from './state/update-current-user/update-current-user.reducer';
import { UpdatePasswordHttpEffect } from './state/update-password/update-password.http.effect';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [ 
    SharedModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule {
  constructor(
    updateCurrentUserHttpEffect: UpdateCurrentUserHttpEffect,
    updateCurrentUserReducer: UpdateCurrentUserReducer,  
    updatePasswordHttpEffect: UpdatePasswordHttpEffect,
  ){}
}
