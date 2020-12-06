import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppAgGridModule } from '../app-ag-grid/app-ag-grid.module';
import { DeleteModelProviders, SaveModelProviders } from '../model/state/providers.const';
import { ModelFormModule } from '../shared/model-form/model-form.module';
import { SharedModule } from '../shared/shared.module';
import { StateModule } from '../state/state.module';
import { DataManagementRoutingModule } from './data-management-routing.module';
import { DataManagerComponent } from './data-manager/data-manager.component';
import { DataPropertyPickerComponent } from './data-manager/data-property-picker/data-property-picker.component';
import { DataTableComponent } from './data-manager/data-table/data-table.component';

@NgModule({
  declarations: [
    DataManagerComponent,
    DataTableComponent,
    DataPropertyPickerComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    StateModule,
    ModelFormModule,
    DataManagementRoutingModule,
    AppAgGridModule,
  ],
  providers: [
    ...SaveModelProviders,
    ...DeleteModelProviders,
  ]
})
export class DataManagementModule { }
