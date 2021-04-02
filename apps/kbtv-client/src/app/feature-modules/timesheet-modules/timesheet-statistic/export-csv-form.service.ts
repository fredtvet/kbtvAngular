import { Injectable } from "@angular/core";
import { _idGenerator } from "@shared-app/helpers/id/id-generator.helper";
import { AgGridAngular } from "ag-grid-angular";
import { ColDef, ValueFormatterParams } from "ag-grid-community";
import { FormService } from "form-sheet";
import { Immutable } from "global-types";
import { KeyOptions, _createMultiCheckboxForm } from "./create-multi-checkbox-form.helper";

@Injectable({providedIn: "any"})
export class ExportCsvFormService {

    constructor(private formService: FormService){}

    open(grid: AgGridAngular): void{
        if(!grid.columnDefs?.length) return;
        
        const keyOptions: KeyOptions[] = (<ColDef[]> grid.columnDefs).map(x => { 
          return { key: x.colId || x.field || "Ukjent", text: x.headerName || "Ukjent"} 
        })

        this.formService.open({
          formConfig: _createMultiCheckboxForm(keyOptions, {submitText: "Eksporter", allowPristine: true}, true),
          navConfig: {title: "Eksporter til CSV format"},
          submitCallback: (val) => this.onSubmit(val, grid)
        })
    }

    private onSubmit = (formVal: Immutable<Record<string, boolean>>, grid: AgGridAngular): void => {
        const colKeys = [];

        for(const key in formVal)
            if(formVal[key]) colKeys.push(key);
   
        this.exportAsCsv(colKeys, grid)   
    }   

    private exportAsCsv = (columnKeys: string[], grid: AgGridAngular) => {
        grid.api.exportDataAsCsv({
          columnKeys,
          fileName: _idGenerator(),
          processCellCallback: (params) => {
            const colDef = params.column.getColDef()
            // Use coldef value formatter in export
            if (colDef.valueFormatter instanceof Function) {
              const valueFormatterParams: ValueFormatterParams = {
                ...params,
                data: params.node?.data,
                node: params.node!,
                colDef: params.column.getColDef()
              };
              return colDef.valueFormatter(valueFormatterParams);
            }
            return params.value;
          }
        });
    }
}