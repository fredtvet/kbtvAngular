import { Model } from 'src/app/core/models/base-entity.interface';
import { AgGridConfig } from 'src/app/shared/components/abstracts/ag-grid-config.interface';
import { StoreState } from './store-state';

export interface DataConfig extends AgGridConfig<Model>{
    foreigns: Partial<StoreState>;
    selectedProp: string;
}