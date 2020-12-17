
import { Model } from '@core/models/base-entity.interface';
import { ModelState } from '@core/state/model-state.interface';
import { Prop } from '@state/interfaces';
import { AgGridConfig } from '@shared/components/abstracts/ag-grid-config.interface';
import { Immutable } from '@global/interfaces';

export interface DataConfig extends AgGridConfig<Model>{
    foreigns: Immutable<Partial<ModelState>>;
    selectedProp: Prop<ModelState>;
}