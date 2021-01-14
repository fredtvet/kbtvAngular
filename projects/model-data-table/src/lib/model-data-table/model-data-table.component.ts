import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellValueChangedEvent, ColDef } from 'ag-grid-community';
import { UnknownState } from 'global-types';
import { ImmutableArray, Maybe } from 'global-types';
import { Observable } from 'rxjs';
import { ModelDataTableFacade } from './model-data-table.facade';

/** Responsible for wrapping an AgGridAngular component. 
 *  It provides the table with model data & listens to changes for updates. */
@Component({
  selector: 'lib-model-data-table',
  templateUrl: './model-data-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:[ModelDataTableFacade]
})
export class ModelDataTableComponent {
    @ViewChild(AgGridAngular) agGrid: AgGridAngular;

    @Input() agGridTheme: string;
    @Input() overlayNoRowsTemplate: HTMLElement;

    @Input('modelProperty') 
    set modelProperty(value: string) { this.facade.updateSelectedProperty(value); }

    rowData$: Observable<ImmutableArray<unknown>> = this.facade.rowData$;
    colDefs$: Observable<Maybe<ColDef[]>> = this.facade.colDefs$;

    constructor(private facade: ModelDataTableFacade) {}

    autoSizeGrid(){
        let cols = this.agGrid.columnApi.getAllColumns().filter(x => x.getColId() != 'checkbox')
        this.agGrid.columnApi.autoSizeColumns(cols);
    }

    getRowNodeId = (t: UnknownState) => 
        this.facade.modelIdentifier ? t[this.facade.modelIdentifier] : null
    
}
