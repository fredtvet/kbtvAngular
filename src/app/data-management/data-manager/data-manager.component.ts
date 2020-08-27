import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { MainNavService } from 'src/app/core/services';
import { Observable, throwError } from 'rxjs';
import { TopDefaultNavConfig } from 'src/app/shared-app/interfaces';
import { catchError, throttleTime, finalize } from 'rxjs/operators';
import { DataManagementStore } from '../data-management.store';
import { StoreState } from '../interfaces/store-state';
import { Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { EmployerFormSheetWrapperComponent } from '../components/employer-form/employer-form-sheet-wrapper.component';
import { MissionTypeFormSheetWrapperComponent } from '../components/mission-type-form/mission-type-form-sheet-wrapper.component';
import { DocumentTypeFormSheetWrapperComponent } from '../components/document-type-form/document-type-form-sheet-wrapper.component';
import { InboundEmailPasswordFormWrapperComponent } from '../components/inbound-email-password-form/inbound-email-password-form-wrapper.component';
import { DataTableComponent } from './data-table/data-table.component';

@Component({
  selector: 'app-data-manager',
  templateUrl: './data-manager.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DataManagerComponent {
@ViewChild('dataTable') dataTable: DataTableComponent;
data$:Observable<any[]> = this.store.data$;

selectedProperty$ = this.store.selectedProperty$;
properties = this.store.properties;

constructor(
  private store: DataManagementStore,
  private mainNavService: MainNavService,
  private router: Router,
  private bottomSheet: MatBottomSheet) { 
    this.configureMainNav();
  }

  updateSelectedProperty = (prop: keyof StoreState) => this.store.updateSelectedProperty(prop);
  
  updateItem(command: any): void{
    if(!command || command === null) return;
    this.store.update$(command.data).pipe(catchError(x => {
        let newData = command?.data;
        newData[command?.column?.colId] = command?.oldValue;
        command.node.setData(newData);
        return throwError(x);
    })).subscribe();     
  }

  deleteItems(ids: number[]): boolean{
    if(ids?.length == 0) return false;
    this.store.deleteRange$(ids).subscribe();   
  }

  openCreateForm(): void{
    switch(this.store.selectedProperty){
      case "missions": this.router.navigate(['data/ny/oppdrag']); break;
      case "employers": this.bottomSheet.open(EmployerFormSheetWrapperComponent); break;
      case "missionTypes": this.bottomSheet.open(MissionTypeFormSheetWrapperComponent); break;
      case "documentTypes": this.bottomSheet.open(DocumentTypeFormSheetWrapperComponent); break;
      case "inboundEmailPasswords": this.bottomSheet.open(InboundEmailPasswordFormWrapperComponent); break;
    }
  }

  private configureMainNav(){
    let cfg = {title:  "Data"} as TopDefaultNavConfig;
    this.mainNavService.addConfig({default: cfg});
  }
}


