import { NgModule } from '@angular/core';
import { DeleteModelProviders } from '../model/state/providers.const';
import { ModelFormModule } from '../shared/model-form/model-form.module';
import { SharedModule } from '../shared/shared.module';
import { STORE_EFFECTS, STORE_REDUCERS } from '../state/injection-tokens';
import { StateModule } from '../state/state.module';
import { SaveUserHttpEffect } from './save-user/save-user.http.effect';
import { SaveUserReducer } from './save-user/save-user.reducer';
import { UpdateUserPasswordHttpEffect } from './update-user-password.http.effect';
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
    StateModule,
    ModelFormModule,
    UsersRoutingModule
  ],
  providers: [
    ...DeleteModelProviders,
    {provide: STORE_EFFECTS, useClass: UpdateUserPasswordHttpEffect, multi: true},
    {provide: STORE_EFFECTS, useClass: SaveUserHttpEffect, multi: true},
    {provide: STORE_REDUCERS, useValue: SaveUserReducer, multi: true},
  ],
})
export class UsersModule {}
