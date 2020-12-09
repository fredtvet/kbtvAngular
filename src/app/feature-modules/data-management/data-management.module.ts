import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DeleteModelProviders, SaveModelProviders } from '@model/state/providers.const';
import { FormToSaveModelStateCommandAdapter } from '@shared/form-adapters/form-to-save-model-state-command.adapter';
import { ModelFormModule } from '@shared/model-form/model-form.module';
import { SharedModule } from '@shared/shared.module';
import { StateModule } from '@state/state.module';
import { AppAgGridModule } from 'src/app/app-ag-grid/app-ag-grid.module';
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
    ModelFormModule.forFeature(FormToSaveModelStateCommandAdapter),
    DataManagementRoutingModule,
    AppAgGridModule,
  ],
  providers: [
    ...SaveModelProviders,
    ...DeleteModelProviders,
  ]
})
export class DataManagementModule { }
