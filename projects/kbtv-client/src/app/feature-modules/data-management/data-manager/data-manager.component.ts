import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ModelState } from '@core/state/model-state.interface';
import { MainTopNavConfig } from '@shared/components/main-top-nav-bar/main-top-nav.config';
import { Maybe, Prop } from 'global-types';
import { ModelDataTableComponent } from 'model-data-table';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ComponentStoreProviders, STORE_REDUCERS } from 'state-management';
import { DataManagerFacade } from './data-manager.facade';
import { UpdateSelectedPropertyReducer } from './state/update-selected-property.reducer';

type ViewModel = {navConfig: MainTopNavConfig, selectedProperty: string}

@Component({
  selector: 'app-data-manager',
  templateUrl: './data-manager.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DataManagerFacade,
    ...ComponentStoreProviders,
    {provide: STORE_REDUCERS, useValue: UpdateSelectedPropertyReducer, multi: true}
  ]
})
export class DataManagerComponent {
  @ViewChild('dataTable') dataTable: ModelDataTableComponent;

  vm$: Observable<ViewModel> = this.facade.selectedProperty$.pipe(
    map(x => { console.log(x);  return <ViewModel>{
      navConfig: this.getNavConfig(x),
      selectedProperty: x
    }})
  )

  properties = this.facade.properties;

  constructor(private facade: DataManagerFacade) {}

  updateSelectedProperty = (prop: Prop<ModelState>) => 
      this.facade.updateSelectedProperty(prop);

  private deleteItems = (): void => {
      let nodes = this.dataTable.agGrid.api.getSelectedNodes();
      this.facade.deleteItems(nodes.map(node => node.data['id']))
  }

  private getNavConfig(selectedProp: Maybe<string>){
      return { 
        title: "Data", 
        buttons: selectedProp ? [
          {icon: "add", callback: () => this.facade.createItem()},
          {icon: "delete_forever", callback: this.deleteItems} 
        ] : null
      };
  }
}

