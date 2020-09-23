import { ModelState } from 'src/app/core/model/model.state';
import { Prop } from 'src/app/core/model/state.types';
import { Model } from 'src/app/core/models/base-entity.interface';
import { AgGridConfig } from 'src/app/shared/components/abstracts/ag-grid-config.interface';

export interface DataConfig extends AgGridConfig<Model>{
    foreigns: Partial<ModelState>;
    selectedProp: Prop<ModelState>;
}