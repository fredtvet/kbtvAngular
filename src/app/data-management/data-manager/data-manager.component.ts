import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModelState } from 'src/app/core/services/model/interfaces';
import { ConfirmDialogService } from 'src/app/core/services/ui/confirm-dialog.service';
import { Prop } from 'src/app/shared-app/prop.type';
import { MainTopNavConfig } from 'src/app/shared/components/main-top-nav-bar/main-top-nav.config';
import { ModelFormService } from 'src/app/shared/model-form';
import { FormToSaveModelStateCommandAdapter } from 'src/app/shared/model-form/adapters/form-to-save-model-state-command.adapter';
import { translations } from 'src/app/shared/translations';
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
    const translatedProp = translations[this.store.selectedProperty.toLowerCase()]?.toLowerCase();
    this.confirmService.open({
      title: `Slett ${nodes.length > 1 ? 'ressurser' : 'ressurs'}?`,
      message: `Bekreft at du ønsker å slette ${nodes.length} ${translatedProp}`,  
      confirmText: 'Slett',
      confirmCallback: () => this.deleteItems(nodes.map(node => node.data['id']))
    })
  }

  private openCreateForm = (): void => {
    this.formService.open({formConfig: {
      stateProp: this.store.selectedProperty,    
      adapter: FormToSaveModelStateCommandAdapter,
      dynamicForm: PropertyFormMap[this.store.selectedProperty]
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

