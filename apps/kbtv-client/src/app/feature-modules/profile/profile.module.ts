import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { OptimisticHttpModule } from 'optimistic-http';
import { StateManagementModule } from 'state-management';
import { ProfileActionRequestMap } from './profile-action-request-map.const';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileActionItemComponent } from './profile/profile-action-item.component';
import { ProfileComponent } from './profile/profile.component';
import { SyncProfileComponent } from './profile/sync-profile.component';
import { UpdatePasswordHttpEffect, ClearAndLogoutEffect } from './state/effects';
import { UpdateCurrentUserReducer } from './state/reducers.const';

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

