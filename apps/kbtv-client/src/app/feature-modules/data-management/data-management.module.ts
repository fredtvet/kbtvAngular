import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { GenericActionRequestMap } from '@core/configurations/optimistic/generic-action-request-map.const';
import { CssLoaderService } from '@core/services/css-loader.service';
import { LazyStyles } from '@shared-app/enums/lazy-styles.enum';
import { translations } from '@shared-app/translations';
import { SharedModule } from '@shared/shared.module';
import { ModelDataTableModule, MODEL_DATA_TABLES_CONFIG, MODEL_DATA_TABLE_PROP_TRANSLATIONS } from 'model/data-table';
import { ModelFormModule } from 'model/form';
import { DeleteModelAction, DeleteModelReducer, ModelStateCommandsModule, SaveModelAction, SaveModelReducer, SetSaveModelStateAction } from 'model/state-commands';
import { ModelStateFetcherModule } from 'model/state-fetcher';
import { OptimisticHttpModule } from 'optimistic-http';
import { StateManagementModule } from 'state-management';
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
    DataManagementRoutingModule, 

    MatFormFieldModule, 
    MatSelectModule,

    StateManagementModule.forFeature({}),
    ModelStateCommandsModule,
    ModelStateFetcherModule,
    ModelFormModule,
    ModelDataTableModule,

    OptimisticHttpModule.forFeature({
      [SetSaveModelStateAction]: GenericActionRequestMap[SetSaveModelStateAction],  
      [DeleteModelAction]: GenericActionRequestMap[DeleteModelAction]
    }), 
    
  ],
  providers: [
    {provide: MODEL_DATA_TABLE_PROP_TRANSLATIONS, useValue: translations},
    {provide: MODEL_DATA_TABLES_CONFIG, useValue: ModelDataTables},
  ]
})
export class DataManagementModule { 
  constructor(private cssLoaderService: CssLoaderService){
    this.cssLoaderService.load(LazyStyles.AgGrid);
  }
}
