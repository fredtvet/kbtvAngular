import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { STORE_EFFECTS, STORE_REDUCERS } from 'state-management'
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileActionItemComponent } from './profile/profile-action-item.component';
import { ProfileComponent } from './profile/profile.component';
import { SyncProfileComponent } from './profile/sync-profile.component';
import { ClearAndLogoutEffect } from './state/clear-and-logout.effect';
import { UpdateCurrentUserHttpEffect } from './state/update-current-user.http.effect';
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
  ],
  providers: [
    { provide: STORE_EFFECTS, useClass: UpdateCurrentUserHttpEffect, multi: true },
    { provide: STORE_EFFECTS, useClass: UpdatePasswordHttpEffect, multi: true },
    { provide: STORE_EFFECTS, useClass: ClearAndLogoutEffect, multi: true },
    { provide: STORE_REDUCERS, useValue: UpdateCurrentUserReducer, multi: true }
  ]
})
export class ProfileModule {}  

