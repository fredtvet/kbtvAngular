import { NgModule } from '@angular/core';

import { UsersRoutingModule } from './users-routing.module';
import { SharedModule, ConfirmDeleteDialogComponent } from '../shared';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormViewComponent } from './components/user-form-view/user-form-view.component';


@NgModule({
  declarations: [
    UserFormComponent,
    UserListComponent,
    UserFormViewComponent
  ],
  entryComponents:[
    UserFormComponent,
    ConfirmDeleteDialogComponent
  ],
  imports: [
    SharedModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
