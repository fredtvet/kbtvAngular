import { ModelState } from '@core/state/model-state.interface';
import { Prop } from '@state/interfaces/prop.type';

export interface ComponentState {
    selectedProperty: Prop<ModelState>
}