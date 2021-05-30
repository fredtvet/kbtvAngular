import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ModelState } from '@core/state/model-state.interface';
import { AppButton } from '@shared-app/interfaces/app-button.interface';
import { MainTopNavConfig } from '@shared/components/main-top-nav-bar/main-top-nav.config';
import { BottomIconButtons } from '@shared/constants/bottom-icon-buttons.const';
import { Prop } from 'global-types';
import { ModelDataTableComponent } from 'model/data-table';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StateManagementModule } from 'state-management';
import { DataManagerFacade } from './data-manager.facade';
import { UpdateSelectedPropertyReducer } from './state/update-selected-property.reducer';

type ViewModel = {bottomActions: AppButton[], selectedProperty: string}

@Component({
  selector: 'app-data-manager',
  templateUrl: './data-manager.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DataManagerFacade,
    ...StateManagementModule.forComponent({ reducers: [UpdateSelectedPropertyReducer]}),
  ]
})
export class DataManagerComponent {
  @ViewChild('dataTable') dataTable: ModelDataTableComponent;

  vm$: Observable<ViewModel> = this.facade.selectedProperty$.pipe(
    map(x => { return <ViewModel>{
      bottomActions: x ? this.selectedItemsActions : null,
      selectedProperty: x
    }})
  )

  properties = this.facade.properties;
  navConfig: MainTopNavConfig = {title: "Databehandling"}

  private selectedItemsActions: AppButton[];

  constructor(private facade: DataManagerFacade) {
    this.selectedItemsActions = [
      {...BottomIconButtons.Add, callback: () => this.facade.createItem()},
      {...BottomIconButtons.Delete, callback: this.deleteItems} 
    ]
  }

  updateSelectedProperty = (prop: Prop<ModelState>) => 
      this.facade.updateSelectedProperty(prop);

  private deleteItems = (): void => {
      let nodes = this.dataTable.agGrid.api.getSelectedNodes();
      this.facade.deleteItems(nodes.map(node => node.data['id']))
  }

}

