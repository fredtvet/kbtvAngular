
import { Model } from 'src/app/core/models/base-entity.interface';
import { ModelState } from 'src/app/model/interfaces';
import { Prop } from 'src/app/shared-app/prop.type';
import { AgGridConfig } from 'src/app/shared/components/abstracts/ag-grid-config.interface';

export interface DataConfig extends AgGridConfig<Model>{
    foreigns: Partial<ModelState>;
    selectedProp: Prop<ModelState>;
}