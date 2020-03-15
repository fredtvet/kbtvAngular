import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { EmployerRoutingModule } from './employer-routing.module';
import { EmployerFormComponent } from './employer-form/employer-form.component';
import { EmployerListComponent } from './employer-list/employer-list.component';
import { ConfirmDeleteDialogComponent } from '../shared/components';
import { EmployerFormViewComponent } from './components/employer-form-view/employer-form-view.component';
import { BottomSheetComponent } from '../shared/layout';


@NgModule({
  declarations: [
    EmployerFormComponent,
    EmployerListComponent,
    EmployerFormViewComponent
  ],
  entryComponents:[
    BottomSheetComponent,
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
