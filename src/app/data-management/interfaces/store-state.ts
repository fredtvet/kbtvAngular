import { ModelState } from 'src/app/core/model/model.state';
import { Prop } from 'src/app/core/model/state.types';

export interface StoreState extends ModelState {
    selectedProperty: Prop<ModelState>,
} 