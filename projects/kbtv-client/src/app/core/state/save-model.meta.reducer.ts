import { Model } from '@core/models';
import { SaveModelAction } from '@model/state/save-model/save-model.action';
import { Reducer } from 'state-management'
import { ModelState } from './model-state.interface';

type Action = SaveModelAction<Model, ModelState>

export function saveModelMetaReducer(reducer: Reducer<ModelState, Action>): Reducer<ModelState, Action> {
    if(reducer.type.indexOf(SaveModelAction) === -1) return reducer;

    return {...reducer, reducerFn: (state: ModelState, action: Action) => {
        const newAction = {...action, entity: {...action.entity, updatedAt: new Date().getTime()}}
        return reducer.reducerFn(state, newAction)
    }}
}