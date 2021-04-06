import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CssLoaderService } from '@core/services/css-loader.service';
import { AppSaveModelProviders } from '@core/state/providers.const';
import { LazyStyles } from '@shared-app/enums/lazy-styles.enum';
import { _formToSaveModelConverter } from '@shared/acton-converters/form-to-save-model.converter';
import { SharedModule } from '@shared/shared.module';
import { translations } from '@shared-app/translations';
import { ModelDataTableModule, MODEL_DATA_TABLES_CONFIG, MODEL_NAME_TRANSLATIONS } from 'model-data-table';
import { ModelFormModule } from 'model-form';
import { STORE_EFFECTS, STORE_REDUCERS } from 'state-management';
import { DeleteModelHttpEffect, DeleteModelReducer } from 'state-model';
import { DataManagementRoutingModule } from './data-management-routing.module';
import { DataManagerComponent } from './data-manager/data-manager.component';
import { DataPropertyPickerComponent } from './data-manager/data-property-picker/data-property-picker.component';
import { ModelDataTables } from './model-data-tables.const';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    DataManagerComponent,
    DataPropertyPickerComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    ModelFormModule.forFeature(_formToSaveModelConverter),
    DataManagementRoutingModule,
    ModelDataTableModule,
    
    MatFormFieldModule, 
    MatSelectModule
  ],
  providers: [
    ...AppSaveModelProviders,
    {provide: MODEL_NAME_TRANSLATIONS, useValue: translations},
    {provide: MODEL_DATA_TABLES_CONFIG, useValue: ModelDataTables},
    {provide: STORE_EFFECTS, useClass: DeleteModelHttpEffect, multi: true},
    {provide: STORE_REDUCERS, useValue: DeleteModelReducer, multi: true},
  ]
})
export class DataManagementModule { 
  constructor(private cssLoaderService: CssLoaderService){
    this.cssLoaderService.load(LazyStyles.AgGrid);
  }
}
