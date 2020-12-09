import { NgModule } from '@angular/core';
import { ModelFormModule } from '@model-form/model-form.module';
import { DeleteModelProviders } from '@model/state/providers.const';
import { SharedModule } from '@shared/shared.module';
import { STORE_EFFECTS, STORE_REDUCERS } from '@state/injection-tokens';
import { SaveUserHttpEffect } from './save-user/save-user.http.effect';
import { SaveUserReducer } from './save-user/save-user.reducer';
import { UserFormToSaveModelAdapter } from './save-user/user-form-to-save-model.adapter';
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
    ModelFormModule.forFeature(UserFormToSaveModelAdapter),
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
