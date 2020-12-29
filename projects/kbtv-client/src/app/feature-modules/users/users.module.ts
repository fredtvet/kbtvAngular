import { NgModule } from '@angular/core';
import { saveModelMetaReducer } from '@core/state/save-model.meta.reducer';
import { ModelFormModule } from '@model-form/model-form.module';
import { SharedModule } from '@shared/shared.module';
import { STORE_EFFECTS, STORE_META_REDUCERS, STORE_REDUCERS } from 'state-management';
import { DeleteModelHttpEffect, DeleteModelReducer } from 'state-model';
import { SaveUserHttpEffect } from './save-user/save-user.http.effect';
import { SaveUserReducer } from './save-user/save-user.reducer';
import { _userFormToSaveUserConverter } from './save-user/user-form-to-save-user.converter';
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
    ModelFormModule.forFeature(_userFormToSaveUserConverter),
    UsersRoutingModule
  ],
  providers: [
    {provide: STORE_EFFECTS, useClass: DeleteModelHttpEffect, multi: true},
    {provide: STORE_REDUCERS, useValue: DeleteModelReducer, multi: true},
    {provide: STORE_EFFECTS, useClass: UpdateUserPasswordHttpEffect, multi: true},
    {provide: STORE_EFFECTS, useClass: SaveUserHttpEffect, multi: true},
    {provide: STORE_REDUCERS, useValue: SaveUserReducer, multi: true},
    {provide: STORE_META_REDUCERS, useValue: saveModelMetaReducer, multi: true}
  ],
})
export class UsersModule {}
