import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { OptimisticHttpModule } from 'optimistic-http';
import { StateManagementModule, STORE_EFFECTS, STORE_REDUCERS } from 'state-management';
import { ProfileActionRequestMap } from './profile-action-request-map.const';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileActionItemComponent } from './profile/profile-action-item.component';
import { ProfileComponent } from './profile/profile.component';
import { SyncProfileComponent } from './profile/sync-profile.component';
import { ClearAndLogoutEffect } from './state/clear-and-logout.effect';
import { UpdateCurrentUserReducer } from './state/update-current-user.reducer';
import { UpdatePasswordHttpEffect } from './state/update-password.http.effect';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileActionItemComponent,
    SyncProfileComponent
  ],
  imports: [ 
    SharedModule,
    ProfileRoutingModule,
    StateManagementModule.forFeature({
      reducers: [UpdateCurrentUserReducer], 
      effects: [UpdatePasswordHttpEffect, ClearAndLogoutEffect],
    }), 
    OptimisticHttpModule.forFeature(ProfileActionRequestMap),
  ],
  providers: []
})
export class ProfileModule {}  

