import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { ConfirmDeleteDialogComponent } from '../shared/components';

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
    ConfirmDeleteDialogComponent
  ],
  imports: [
    SharedModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
