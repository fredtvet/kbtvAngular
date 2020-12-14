import { ModelState } from '@core/state/model-state.interface';
import { Immutable } from '@immutable/interfaces';
import { _createReducer } from '@state/helpers/create-reducer.helper';
import { Prop } from '@state/interfaces';
import { StateAction } from '@state/state.action';
import { ComponentState } from '../../interfaces/component-state.interface';

export const UpdateSelectedPropertyAction = "UPDATE_SELECTED_PROPERTY_ACTION";
export interface UpdateSelectedPropertyAction extends StateAction {
    selectedProperty: Prop<ModelState>
}

export const UpdateSelectedPropertyReducer = _createReducer(
    UpdateSelectedPropertyAction,
    (state: Immutable<ComponentState>, action: UpdateSelectedPropertyAction) => { 
        return {selectedProperty: action.selectedProperty}
    }
)