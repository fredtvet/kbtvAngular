import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppSaveModelProviders } from '@core/state/providers.const';
import { ModelFormModule } from '@model-form/model-form.module';
import { DeleteModelProviders } from '@model/state/providers.const';
import { _formToSaveModelConverter } from '@shared/acton-converters/form-to-save-model.converter';
import { SharedModule } from '@shared/shared.module';
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
    ModelFormModule.forFeature(_formToSaveModelConverter),
    DataManagementRoutingModule,
    AppAgGridModule,
  ],
  providers: [
    ...AppSaveModelProviders,
    ...DeleteModelProviders,
  ]
})
export class DataManagementModule { }
