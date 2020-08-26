import { NgModule } from '@angular/core';
import { AppAgGridModule } from '../app-ag-grid/app-ag-grid.module';
import { SharedModule } from '../shared/shared.module';
import { DocumentTypeFormSheetWrapperComponent } from './components/document-type-form/document-type-form-sheet-wrapper.component';
import { DocumentTypeFormViewComponent } from './components/document-type-form/document-type-form-view/document-type-form-view.component';
import { DocumentTypeFormComponent } from './components/document-type-form/document-type-form.component';
import { EmployerFormSheetWrapperComponent } from './components/employer-form/employer-form-sheet-wrapper.component';
import { EmployerFormViewComponent } from './components/employer-form/employer-form-view/employer-form-view.component';
import { EmployerFormComponent } from './components/employer-form/employer-form.component';
import { InboundEmailPasswordFormViewComponent } from './components/inbound-email-password-form/inbound-email-password-form-view/inbound-email-password-form-view.component';
import { InboundEmailPasswordFormWrapperComponent } from './components/inbound-email-password-form/inbound-email-password-form-wrapper.component';
import { InboundEmailPasswordFormComponent } from './components/inbound-email-password-form/inbound-email-password-form.component';
import { MissionTypeFormSheetWrapperComponent } from './components/mission-type-form/mission-type-form-sheet-wrapper.component';
import { MissionTypeFormViewComponent } from './components/mission-type-form/mission-type-form-view/mission-type-form-view.component';
import { MissionTypeFormComponent } from './components/mission-type-form/mission-type-form.component';
import { DataManagementRoutingModule } from './data-management-routing.module';
import { DataManagerComponent } from './data-manager/data-manager.component';
import { DataPropertyPickerComponent } from './data-manager/data-property-picker/data-property-picker.component';
import { DataTableComponent } from './data-manager/data-table/data-table.component';






@NgModule({
  declarations: [
    DataManagerComponent,
    EmployerFormComponent,
    EmployerFormViewComponent,
    EmployerFormSheetWrapperComponent,
    MissionTypeFormComponent,
    MissionTypeFormViewComponent,
    MissionTypeFormSheetWrapperComponent,
    DocumentTypeFormViewComponent,
    DocumentTypeFormComponent,
    DocumentTypeFormSheetWrapperComponent,
    DataPropertyPickerComponent,
    DataTableComponent,
    InboundEmailPasswordFormComponent,
    InboundEmailPasswordFormViewComponent,
    InboundEmailPasswordFormWrapperComponent
  ],
  imports: [
    SharedModule,
    DataManagementRoutingModule,
    AppAgGridModule,
  ]
})

export class DataManagementModule { }
