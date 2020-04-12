import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';

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
    AgGridModule.withComponents([]),
  ]
})

export class DataManagementModule { }
