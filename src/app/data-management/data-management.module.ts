import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

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
  ]
})

export class DataManagementModule { }
