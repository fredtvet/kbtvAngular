import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { STORE_EFFECTS, STORE_REDUCERS } from '@state/constants/injection-tokens.const';
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
    ProfileRoutingModule,
  ],
  providers: [
    { provide: STORE_EFFECTS, useClass: UpdateCurrentUserHttpEffect, multi: true },
    { provide: STORE_EFFECTS, useClass: UpdatePasswordHttpEffect, multi: true },
    { provide: STORE_REDUCERS, useValue: UpdateCurrentUserReducer, multi: true }
  ]
})
export class ProfileModule {}  

