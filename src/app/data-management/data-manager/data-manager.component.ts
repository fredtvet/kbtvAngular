import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { GenericModelFormConfig, ModelFormViewConfig, ModelFormWrapperConfig } from 'src/app/core/model/form';
import { ModelState } from 'src/app/core/model/model.state';
import { Prop } from 'src/app/core/model/state.types';
import { Model } from 'src/app/core/models';
import { ModelFormService } from 'src/app/core/services/model';
import { ConfirmDialogService } from 'src/app/core/services/ui/confirm-dialog.service';
import { StateAction } from 'src/app/core/state';
import { MainNavService } from 'src/app/layout';
import { ConfirmDialogConfig, MainTopNavComponent } from 'src/app/shared/components';
import { MainTopNavConfig } from 'src/app/shared/components/main-top-nav/main-top-nav-config.interface';
import { DataManagementStore } from '../data-management.store';
import { DataConfig } from '../interfaces/data-config.interface';
import { DataTableComponent } from './data-table/data-table.component';
import { PropertyFormMap } from './property-form.map';

type FormConfig = GenericModelFormConfig<Model,any, ModelFormViewConfig<Model, any>>
type WrapperConfig = ModelFormWrapperConfig<FormConfig>

@Component({
  selector: 'app-data-manager',
  templateUrl: './data-manager.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DataManagerComponent {
@ViewChild('dataTable') dataTable: DataTableComponent;
dataConfig$:Observable<DataConfig> = this.store.dataConfig$;

selectedProperty$ = this.store.selectedProperty$;
properties = this.store.properties;

constructor(
  private store: DataManagementStore,
  private mainNavService: MainNavService,
  private router: Router,    
  private confirmService: ConfirmDialogService,
  private formService: ModelFormService) { 
    this.configureMainNav();
  }

  updateSelectedProperty = (prop: Prop<ModelState>) => 
    this.store.updateSelectedProperty(prop);
  
  updateItem(command: any): void{
    if(!command || command === null) return;
    this.store.save({entity: command.data, saveAction: StateAction.Update}); 
  }

  openDeleteDialog = (): void => {
    let nodes = this.dataTable.dataGrid.api.getSelectedNodes();
    if(nodes?.length == 0) return;

    this.confirmService.open({
      message: 'Slett ressurs(er)?',  confirmText: 'Slett',
      confirmCallback: () => this.deleteItems(nodes.map(node => node.data['id']))
    })
  }

  openCreateForm(): void{
    if(this.store.selectedProperty === "missions"){ //Lazy loaded form
      this.router.navigate(['data/ny/oppdrag']);
      return;
    }

    this.formService.open<any, Model, WrapperConfig>({formConfig: {
      stateProp: this.store.selectedProperty,
      viewComponent: PropertyFormMap[this.store.selectedProperty]
    }})
  }

  private deleteItems(ids: string[]): boolean{
    if(ids?.length == 0) return false;
    this.store.delete({ids});   
  }

  private configureMainNav(){
    this.mainNavService.addConfig<MainTopNavConfig>({
      topNavComponent: MainTopNavComponent, 
      topNavConfig: {title:  "Data"}
    });
  }
}


