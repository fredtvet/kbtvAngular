import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AppAgGridModule } from '../app-ag-grid/app-ag-grid.module';
import { DataManagementRoutingModule } from './data-management-routing.module';
import { DataManagerComponent } from './data-manager/data-manager.component';

import {
  ConfirmDeleteDialogComponent,
  MissionTypeFormDialogComponent,
  ReportTypeFormDialogComponent,
} from '../shared/components';




@NgModule({
  declarations: [
    DataManagerComponent
  ],
  entryComponents:[
    ConfirmDeleteDialogComponent,
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
