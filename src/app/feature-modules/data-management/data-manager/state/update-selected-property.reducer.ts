import { ModelState } from '@core/state/model-state.interface';
import { Reducer, Prop } from '@state/interfaces';
import { StateAction } from '@state/state.action';
import { ComponentState } from '../../interfaces/component-state.interface';

export class UpdateSelectedPropertyAction extends StateAction {
    constructor(public selectedProperty: Prop<ModelState>){ super() }
}

export const UpdateSelectedPropertyReducer: Reducer<ComponentState, UpdateSelectedPropertyAction> = {
    action: UpdateSelectedPropertyAction,
    reducerFn: (state: ComponentState, action: UpdateSelectedPropertyAction) => { 
        return {selectedProperty: action.selectedProperty}
    }
}