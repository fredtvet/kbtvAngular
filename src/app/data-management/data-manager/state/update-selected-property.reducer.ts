import { ModelState } from 'src/app/model/interfaces';
import { Prop } from 'src/app/shared-app/prop.type';
import { Reducer, StateAction } from 'src/app/state/interfaces';
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