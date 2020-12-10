import { StateAction, Reducer } from '../interfaces';
import { _deepClone } from './deep-clone.helper';
import { _getReducersStateProps } from './get-reducers-state-props.helper';

export function _mergeReducers(reducers: Reducer<any, StateAction>[]): Reducer<any, StateAction> {
    return <Reducer<any, StateAction>>{actionId: null,
        reducerFn: (state: any, action: any): any => {
            for(const reducer of reducers) {
                const inputAction = reducer.noDeepCloneAction ? action : _deepClone(action);
                const inputState = reducer.noDeepCloneState ? state : _deepClone(state);
                state = {...state, ...reducer.reducerFn(inputState, inputAction)}
            }
            return state;
        },
        stateProperties: (action: any) => _getReducersStateProps(reducers, action)
    }
}     