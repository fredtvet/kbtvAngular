import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { EmployerRoutingModule } from './employer-routing.module';
import { EmployerFormComponent } from './employer-form/employer-form.component';
import { EmployerListComponent } from './employer-list/employer-list.component';
import { ConfirmDeleteDialogComponent } from '../shared/components';
import { EmployerFormViewComponent } from './employer-form/employer-form-view/employer-form-view.component';


@NgModule({
  declarations: [
    EmployerFormComponent,
    EmployerListComponent,
    EmployerFormViewComponent
  ],
  entryComponents:[
    ConfirmDeleteDialogComponent
  ],
  imports: [
    SharedModule,
    EmployerRoutingModule
  ],
  exports: [
    EmployerFormComponent,
    EmployerFormViewComponent
  ]
})
export class EmployerModule { }
