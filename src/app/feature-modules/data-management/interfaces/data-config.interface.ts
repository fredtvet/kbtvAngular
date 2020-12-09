
import { Model } from '@core/models/base-entity.interface';
import { ModelState } from '@core/state/model-state.interface';
import { Prop } from '@state/interfaces/prop.type';
import { AgGridConfig } from '@shared/components/abstracts/ag-grid-config.interface';

export interface DataConfig extends AgGridConfig<Model>{
    foreigns: Partial<ModelState>;
    selectedProp: Prop<ModelState>;
}