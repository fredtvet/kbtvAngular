import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ModelFormModule } from 'model/form';
import { DeleteModelReducer } from 'model/state-commands';
import { OptimisticHttpModule } from 'optimistic-http';
import { StateManagementModule } from 'state-management';
import { SaveUserReducer } from './save-user.reducer';
import { UpdateUserPasswordHttpEffect } from './update-user-password.http.effect';
import { UserActionRequestMap } from './user-action-request-map.const';
import { UserCardComponent } from './user-list/user-card/user-card.component';
import { UserListComponent } from './user-list/user-list.component';
import { UsersRoutingModule } from './users-routing.module';


@NgModule({
  declarations: [    
    UserListComponent, 
    UserCardComponent,
  ],
  imports: [
    SharedModule,
    StateManagementModule.forFeature({
      reducers: [SaveUserReducer, DeleteModelReducer],
      effects: [UpdateUserPasswordHttpEffect]
    }), 
    ModelFormModule,
    OptimisticHttpModule.forFeature(UserActionRequestMap),
    UsersRoutingModule
  ],
  providers: [],
})
export class UsersModule {}
