import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { GenericActionRequestMap } from '@core/configurations/optimistic/generic-action-request-map.const';
import { CssLoaderService } from '@core/services/css-loader.service';
import { LazyStyles } from '@shared-app/enums/lazy-styles.enum';
import { translations } from '@shared-app/translations';
import { _formToSaveModelConverter } from '@shared/acton-converters/form-to-save-model.converter';
import { SharedModule } from '@shared/shared.module';
import { ModelDataTableModule, MODEL_DATA_TABLES_CONFIG, MODEL_DATA_TABLE_PROP_TRANSLATIONS } from 'model/data-table';
import { ModelFormModule } from 'model/form';
import { DeleteModelAction, DeleteModelReducer, SaveModelAction, SaveModelReducer } from 'model/state-commands';
import { OptimisticHttpModule } from 'optimistic-http';
import { STORE_REDUCERS } from 'state-management';
import { DataManagementRoutingModule } from './data-management-routing.module';
import { DataManagerComponent } from './data-manager/data-manager.component';
import { DataPropertyPickerComponent } from './data-manager/data-property-picker/data-property-picker.component';
import { ModelDataTables } from './model-data-tables.const';

@NgModule({
  declarations: [
    DataManagerComponent,
    DataPropertyPickerComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    ModelFormModule.forFeature(_formToSaveModelConverter),
    OptimisticHttpModule.forFeature({
      [SaveModelAction]: GenericActionRequestMap[SaveModelAction],  
      [DeleteModelAction]: GenericActionRequestMap[DeleteModelAction]
    }),
    
    DataManagementRoutingModule,
    ModelDataTableModule,
    
    MatFormFieldModule, 
    MatSelectModule
  ],
  providers: [
    {provide: STORE_REDUCERS, useValue: SaveModelReducer, multi: true},
    {provide: STORE_REDUCERS, useValue: DeleteModelReducer, multi: true},
    {provide: MODEL_DATA_TABLE_PROP_TRANSLATIONS, useValue: translations},
    {provide: MODEL_DATA_TABLES_CONFIG, useValue: ModelDataTables},
  ]
})
export class DataManagementModule { 
  constructor(private cssLoaderService: CssLoaderService){
    this.cssLoaderService.load(LazyStyles.AgGrid);
  }
}
