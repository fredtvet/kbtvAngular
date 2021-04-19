import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ModelFormModule } from 'model/form';
import { STORE_EFFECTS, STORE_REDUCERS } from 'state-management';
import { DeleteModelReducer } from 'model/state-commands';
import { SaveUserReducer } from './save-user/save-user.reducer';
import { _userFormToSaveUserConverter } from './save-user/user-form-to-save-user.converter';
import { UpdateUserPasswordHttpEffect } from './update-user-password.http.effect';
import { UserCardComponent } from './user-list/user-card/user-card.component';
import { UserListComponent } from './user-list/user-list.component';
import { UsersRoutingModule } from './users-routing.module';
import { OptimisticHttpModule } from 'optimistic-http';
import { UserActionRequestMap } from './user-action-request-map.const';


@NgModule({
  declarations: [    
    UserListComponent, 
    UserCardComponent,
  ],
  imports: [
    SharedModule,
    ModelFormModule.forFeature(_userFormToSaveUserConverter),
    OptimisticHttpModule.forFeature(UserActionRequestMap),
    UsersRoutingModule
  ],
  providers: [
    {provide: STORE_REDUCERS, useValue: DeleteModelReducer, multi: true},
    {provide: STORE_EFFECTS, useClass: UpdateUserPasswordHttpEffect, multi: true},
    {provide: STORE_REDUCERS, useValue: SaveUserReducer, multi: true},
  ],
})
export class UsersModule {}
