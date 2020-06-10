import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AppAgGridModule } from '../app-ag-grid/app-ag-grid.module';
import { DataManagementRoutingModule } from './data-management-routing.module';
import { DataManagerComponent } from './data-manager/data-manager.component';

import { ConfirmDialogComponent } from '../shared/components';

import { EmployerFormComponent } from './components/employer-form/employer-form.component';
import { EmployerFormViewComponent } from './components/employer-form/employer-form-view/employer-form-view.component';
import { EmployerFormSheetWrapperComponent } from './components/employer-form/employer-form-sheet-wrapper.component';
import { MissionTypeFormComponent } from './components/mission-type-form/mission-type-form.component';
import { DocumentTypeFormComponent } from './components/document-type-form/document-type-form.component';
import { MissionTypeFormSheetWrapperComponent } from './components/mission-type-form/mission-type-form-sheet-wrapper.component';
import { DocumentTypeFormSheetWrapperComponent } from './components/document-type-form/document-type-form-sheet-wrapper.component';
import { DocumentTypeFormViewComponent } from './components/document-type-form/document-type-form-view/document-type-form-view.component';
import { MissionTypeFormViewComponent } from './components/mission-type-form/mission-type-form-view/mission-type-form-view.component';
import { DataTablePickerComponent } from './data-manager/data-table-picker/data-table-picker.component';
import { DataTableComponent } from './data-manager/data-table/data-table.component';
import { DataManagerFacadeService } from './data-manager-facade.service';




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
    DataTablePickerComponent,
    DataTableComponent,
  ],
  entryComponents:[
    ConfirmDialogComponent,
    EmployerFormSheetWrapperComponent,
    MissionTypeFormSheetWrapperComponent,
    DocumentTypeFormSheetWrapperComponent
  ],
  providers:[
    DataManagerFacadeService
  ],
  imports: [
    SharedModule,
    DataManagementRoutingModule,
    AppAgGridModule,
  ]
})

export class DataManagementModule { }
