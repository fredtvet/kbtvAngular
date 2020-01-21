import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerRoutingModule } from './employer-routing.module';
import { EmployerFormComponent } from './employer-form/employer-form.component';
import { EmployerListComponent } from './employer-list/employer-list.component';
import { SharedModule, ConfirmDeleteDialogComponent } from '../shared';


@NgModule({
  declarations: [
    EmployerFormComponent,
    EmployerListComponent
  ],
  entryComponents:[
    EmployerFormComponent,
    ConfirmDeleteDialogComponent
  ],
  imports: [
    SharedModule,
    EmployerRoutingModule
  ]
})
export class EmployerModule { }
