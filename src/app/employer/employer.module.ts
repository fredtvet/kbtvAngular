import { NgModule } from '@angular/core';

import { EmployerRoutingModule } from './employer-routing.module';
import { EmployerFormComponent } from './employer-form/employer-form.component';
import { EmployerListComponent } from './employer-list/employer-list.component';
import { SharedModule, ConfirmDeleteDialogComponent } from '../shared';
import { EmployerFormViewComponent } from './components/employer-form-view/employer-form-view.component';

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
