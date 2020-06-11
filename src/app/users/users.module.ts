import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { ConfirmDialogComponent } from '../shared/components';

import { UserListComponent } from './user-list/user-list.component';
import { UserCardComponent } from './user-list/user-card/user-card.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserFormViewComponent } from './components/user-form/user-form-view/user-form-view.component';
import { UserFormSheetWrapperComponent } from './components/user-form/user-form-sheet-wrapper.component';

@NgModule({
  declarations: [    
    UserListComponent, 
    UserCardComponent,
    UserFormComponent,
    UserFormViewComponent,
    UserFormSheetWrapperComponent
  ],
  imports: [
    SharedModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
