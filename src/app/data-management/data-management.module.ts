import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataManagementRoutingModule } from './data-management-routing.module';


import { DataManagerComponent } from './data-manager/data-manager.component';
import { SharedModule, ConfirmDeleteDialogComponent } from '../shared';

@NgModule({
  declarations: [DataManagerComponent],
  imports: [
    CommonModule,
    DataManagementRoutingModule,
    SharedModule
  ],
  entryComponents:[
    ConfirmDeleteDialogComponent
  ],
})
export class DataManagementModule { }
