import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { NewPasswordFormViewComponent } from './new-password-form/new-password-form-view/new-password-form-view.component';
import { NewPasswordFormComponent } from './new-password-form/new-password-form.component';
import { UserCardComponent } from './user-list/user-card/user-card.component';
import { UserListComponent } from './user-list/user-list.component';
import { UsersRoutingModule } from './users-routing.module';


@NgModule({
  declarations: [    
    UserListComponent, 
    UserCardComponent,
    NewPasswordFormComponent,
    NewPasswordFormViewComponent
  ],
  imports: [
    SharedModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
