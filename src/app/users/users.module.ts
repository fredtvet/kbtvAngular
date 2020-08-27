import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';

import { UserListComponent } from './user-list/user-list.component';
import { UserCardComponent } from './user-list/user-card/user-card.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserFormViewComponent } from './user-form/user-form-view/user-form-view.component';
import { UserFormSheetWrapperComponent } from './user-form/user-form-sheet-wrapper.component';
import { NewPasswordFormComponent } from './new-password-form/new-password-form.component';
import { NewPasswordFormViewComponent } from './new-password-form/new-password-form-view/new-password-form-view.component';
import { NewPasswordFormSheetWrapperComponent } from './new-password-form/new-password-form-sheet-wrapper.component';

@NgModule({
  declarations: [    
    UserListComponent, 
    UserCardComponent,
    UserFormComponent,
    UserFormViewComponent,
    UserFormSheetWrapperComponent,
    NewPasswordFormComponent,
    NewPasswordFormViewComponent,
    NewPasswordFormSheetWrapperComponent
  ],
  imports: [
    SharedModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
