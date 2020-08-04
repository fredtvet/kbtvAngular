import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { MainNavService } from 'src/app/core/services';
import { Observable, throwError } from 'rxjs';
import { TopDefaultNavConfig } from 'src/app/shared-app/interfaces';
import { DataManagerFacadeService } from '../data-manager-facade.service';
import { BaseEntity } from 'src/app/core/models';
import { DataTableComponent } from './data-table/data-table.component';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-data-manager',
  templateUrl: './data-manager.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DataManagerComponent {
@ViewChild('dataTable') dataTable: DataTableComponent;

data$:Observable<BaseEntity[]> = this.dataManagerFacade.data$;

selectedTable$ = this.dataManagerFacade.selectedTable$;
tables = this.dataManagerFacade.tables;

constructor(
  private mainNavService: MainNavService,
  private dataManagerFacade: DataManagerFacadeService,) { 
    this.configureMainNav();
  }

  changeTable = (table: string) => this.dataManagerFacade.changeTable(table);
  
  editCell(command: any){
    if(command.oldValue != command.newValue)
      this.dataManagerFacade.updateSelectedTableEntity$(command.data).pipe(catchError(x => {
        this.revertTableUpdate(command)
        return throwError(x);
      })).subscribe();     
  }

  deleteItems(ids: number[]): boolean{
    if(ids.length == 0) return false;
      this.dataManagerFacade.deleteSelectedTableEntities(ids);   
  }

  createItem = () => this.dataManagerFacade.createItem();
  
  private revertTableUpdate(command:any){
    //command.node.data[command.colDef.Field] = command.oldValue;
    command.node.setDataValue(command.column, command.oldValue);
  }

  private configureMainNav(){
    let cfg = {title:  "Data"} as TopDefaultNavConfig;
    this.mainNavService.addConfig({default: cfg});
  }
}


