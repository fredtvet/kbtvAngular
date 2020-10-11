import { NgModule } from '@angular/core';
import { AppAgGridModule } from '../app-ag-grid/app-ag-grid.module';
import { DeleteModelHttpEffect } from '../core/services/model/state/delete-model/delete-model.http.effect';
import { DeleteModelReducer } from '../core/services/model/state/delete-model/delete-model.reducer';
import { SaveModelHttpEffect } from '../core/services/model/state/save-model/save-model.http.effect';
import { SaveModelReducer } from '../core/services/model/state/save-model/save-model.reducer';
import { SharedModule } from '../shared/shared.module';
import { DocumentTypeFormViewComponent } from './components/document-type-form-view/document-type-form-view.component';
import { EmployerFormViewComponent } from './components/employer-form-view/employer-form-view.component';
import { InboundEmailPasswordFormViewComponent } from './components/inbound-email-password-form-view/inbound-email-password-form-view.component';
import { MissionTypeFormViewComponent } from './components/mission-type-form-view/mission-type-form-view.component';
import { DataManagementRoutingModule } from './data-management-routing.module';
import { DataManagerComponent } from './data-manager/data-manager.component';
import { DataPropertyPickerComponent } from './data-manager/data-property-picker/data-property-picker.component';
import { DataTableComponent } from './data-manager/data-table/data-table.component';

@NgModule({
  declarations: [
    DataManagerComponent,
    DataTableComponent,
    DataPropertyPickerComponent,
    EmployerFormViewComponent,
    MissionTypeFormViewComponent,
    DocumentTypeFormViewComponent,
    InboundEmailPasswordFormViewComponent,
  ],
  imports: [
    SharedModule,
    DataManagementRoutingModule,
    AppAgGridModule,
  ],
})

export class DataManagementModule {
  constructor(
    deleteReducer: DeleteModelReducer, 
    deleteHttpEffect: DeleteModelHttpEffect,
    saveModelReducer: SaveModelReducer,
    saveModelHttpEffect: SaveModelHttpEffect
  ){}
}
