import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AppAgGridModule } from '../app-ag-grid/app-ag-grid.module';
import { DataManagementRoutingModule } from './data-management-routing.module';
import { DataManagerComponent } from './data-manager/data-manager.component';

import { ConfirmDialogComponent } from '../shared/components';
import { MissionTypeFormDialogComponent } from './components/mission-type-form-dialog/mission-type-form-dialog.component';
import { ReportTypeFormDialogComponent } from './components/report-type-form-dialog/report-type-form-dialog.component';
import { EmployerFormComponent } from './employer-form/employer-form.component';
import { EmployerFormViewComponent } from './employer-form/employer-form-view/employer-form-view.component';




@NgModule({
  declarations: [
    DataManagerComponent,
    MissionTypeFormDialogComponent,
    ReportTypeFormDialogComponent,
    EmployerFormComponent,
    EmployerFormViewComponent
  ],
  entryComponents:[
    ConfirmDialogComponent,
    MissionTypeFormDialogComponent,
    ReportTypeFormDialogComponent
  ],
  imports: [
    SharedModule,
    DataManagementRoutingModule,
    AppAgGridModule
  ]
})

export class DataManagementModule { }
