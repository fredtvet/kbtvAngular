import { ModelState } from '@core/state/model-state.interface';
import { Prop } from '@state/interfaces/prop.type';
import { Reducer, StateAction } from '@state/interfaces';
import { ComponentState } from '../../interfaces/component-state.interface';

export interface UpdateSelectedPropertyCommand extends StateAction {
    selectedProperty: Prop<ModelState>
}

export const UpdateSelectedPropertyActionId = "UPDATE_SELECTED_PROPERTY";

export const UpdateSelectedPropertyReducer: Reducer<ComponentState> = {
    actionId: UpdateSelectedPropertyActionId,
    reducerFn: (state: ComponentState, action: UpdateSelectedPropertyCommand) => { 
        return {selectedProperty: action.selectedProperty}
    }
}