import { ModelState } from '@core/state/model-state.interface';
import { Immutable, Prop } from 'global-types';
import { StateAction, _createReducer } from 'state-management';
import { ComponentState } from '../../interfaces/component-state.interface';

export const UpdateSelectedPropertyAction = "UPDATE_SELECTED_PROPERTY_ACTION";
export interface UpdateSelectedPropertyAction extends StateAction {
    selectedProperty: Prop<ModelState>
}

export const UpdateSelectedPropertyReducer = _createReducer(
    UpdateSelectedPropertyAction,
    (state: Immutable<ComponentState>, action: Immutable<UpdateSelectedPropertyAction>) => { 
        return {selectedProperty: action.selectedProperty}
    }
)