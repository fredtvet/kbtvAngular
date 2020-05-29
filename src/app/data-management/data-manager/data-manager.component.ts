import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MainNavService } from 'src/app/core/services';
import { Observable } from 'rxjs';
import { BaseEntity, TopDefaultNavConfig } from 'src/app/shared/interfaces';
import { DataManagerFacadeService } from '../data-manager-facade.service';

@Component({
  selector: 'app-data-manager',
  templateUrl: './data-manager.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DataManagerComponent {

data$:Observable<BaseEntity[]> = this.dataManagerFacade.data$;

selectedTable$ = this.dataManagerFacade.selectedTable$;
tables = this.dataManagerFacade.tables;

constructor(
  private mainNavService: MainNavService,
  private dataManagerFacade: DataManagerFacadeService,) { 
    this.configureMainNav();
  }

  changeTable = (table: string) => this.dataManagerFacade.changeTable(table);
  
  editCell(e: any){
    if(e.oldValue != e.newValue)
      this.dataManagerFacade.updateSelectedTableEntity(e.data);     
  }

  deleteItems(ids: number[]): boolean{
    if(ids.length == 0) return false;
      this.dataManagerFacade.deleteSelectedTableEntities(ids);   
  }

  createItem() { this.dataManagerFacade.createItem()
  }


  private configureMainNav(){
    let cfg = {title:  "Data"} as TopDefaultNavConfig;
    this.mainNavService.addTopNavConfig({default: cfg});
  }
}


