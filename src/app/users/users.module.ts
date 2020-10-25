import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SaveUserHttpEffect } from './save-user/save-user.http.effect';
import { SaveUserReducer } from './save-user/save-user.reducer';
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
    UsersRoutingModule
  ]
})
export class UsersModule {
  constructor(
    saveUserReducer: SaveUserReducer, 
    saveUserHttpEffect: SaveUserHttpEffect
  ){}
}
