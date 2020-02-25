import { NgModule } from '@angular/core';

import { DataManagementRoutingModule } from './data-management-routing.module';


import { DataManagerComponent } from './data-manager/data-manager.component';
import {
  SharedModule,
  ConfirmDeleteDialogComponent,
  MissionTypeFormDialogComponent,
  ReportTypeFormDialogComponent,
} from '../shared';

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
