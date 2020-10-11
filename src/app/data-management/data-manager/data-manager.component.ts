import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Model } from 'src/app/core/models';
import { FormToSaveModelStateCommandAdapter } from 'src/app/core/services/model/adapters/form-to-save-model-state-command.adapter';
import { ModelFormConfig, ModelFormWrapperConfig } from 'src/app/core/services/model/form/interfaces';
import { ModelFormService } from 'src/app/core/services/model/form/model-form.service';
import { ModelState } from 'src/app/core/services/model/interfaces';
import { StateAction } from 'src/app/core/services/state/state-action.enum';
import { ConfirmDialogService } from 'src/app/core/services/ui/confirm-dialog.service';
import { Prop } from 'src/app/shared-app/prop.type';
import { MainTopNavConfig } from 'src/app/shared/components/main-top-nav-bar/main-top-nav.config';
import { DataManagementStore } from '../data-management.store';
import { DataConfig } from '../interfaces/data-config.interface';
import { DataTableComponent } from './data-table/data-table.component';
import { PropertyFormMap } from './property-form.map';

type ViewModel = {navConfig: MainTopNavConfig} & DataConfig

@Component({
  selector: 'app-data-manager',
  templateUrl: './data-manager.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataManagerComponent {
@ViewChild('dataTable') dataTable: DataTableComponent;

vm$:Observable<ViewModel> = combineLatest([
  this.store.dataConfig$,
  this.store.selectedProperty$.pipe(map(x => this.getNavConfig(x)))
]).pipe(
  map(([dataConfig, navConfig]) => { return {...dataConfig, navConfig}})
);

properties = this.store.properties;

constructor(
  private store: DataManagementStore,
  private router: Router,    
  private confirmService: ConfirmDialogService,
  private formService: ModelFormService) { }

  updateSelectedProperty = (prop: Prop<ModelState>) => 
    this.store.updateSelectedProperty(prop);
  
  updateItem(command: any): void{
    if(!command || command === null) return;
    this.store.update(command.data); 
  }

  private openDeleteDialog = (): void => {
    let nodes = this.dataTable.dataGrid.api.getSelectedNodes();
    if(nodes?.length == 0) return;

    this.confirmService.open({
      message: 'Slett ressurs(er)?',  confirmText: 'Slett',
      confirmCallback: () => this.deleteItems(nodes.map(node => node.data['id']))
    })
  }

  private openCreateForm = (): void => {
    if(this.store.selectedProperty === "missions"){ //Lazy loaded form
      this.router.navigate(['data/ny/oppdrag']);
      return;
    }

    this.formService.open<ModelFormConfig<any, Model, any>>({formConfig: {
      stateProp: this.store.selectedProperty,    
      adapter: FormToSaveModelStateCommandAdapter,
      viewComponent: PropertyFormMap[this.store.selectedProperty]
    }})
  }

  private deleteItems(ids: string[]): boolean{
    if(ids?.length == 0) return false;
    this.store.delete({ids});   
  }

  private getNavConfig(selectedProp: string){
    return { 
      title: "Data", 
      buttons: selectedProp ? [
        {icon: "add", callback: this.openCreateForm},
        {icon: "delete_forever", callback: this.openDeleteDialog} 
      ] : null
    };
  }
}

