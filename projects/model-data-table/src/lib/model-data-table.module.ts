import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AgGridModule } from "ag-grid-angular";
import { ModelDataTableComponent } from "./model-data-table/model-data-table.component";

/** Responsible for exporting the {@link ModelDataTableComponent}. */
@NgModule({
    declarations: [ModelDataTableComponent],
    imports: [ 
        CommonModule,
        AgGridModule.withComponents([]) 
    ],
    exports: [ModelDataTableComponent],
  })
  export class ModelDataTableModule { }
  