import { Reducer } from '../interfaces';
import { StateAction } from '../state.action';
import { _cloneInstance } from './clone-instance.helper';
import { _deepClone } from './deep-clone.helper';
import { _getReducersStateProps } from './get-reducers-state-props.helper';

export function _mergeReducers(reducers: Reducer<any, StateAction>[], action: StateAction): Reducer<any, StateAction> {
    return <Reducer<any, StateAction>>{action,
        reducerFn: (state: any, action: any): any => {
            let newState: any; 
            for(const reducer of reducers) {
                const inputAction = _cloneInstance(action, !reducer.noDeepCloneAction);
                const inputState = reducer.noDeepCloneState ? {...state} : _deepClone(state);
                const reducerState = reducer.reducerFn(inputState, inputAction);
                if(!reducerState) continue;
                state = {...state, ...reducerState} //merge total state for next reducer
                newState = {...newState || {}, ...reducerState} //Store all new state to prevent emitting entire state
            }
            return newState;
        },
        stateProperties: (action: any) => _getReducersStateProps(reducers, action)
    }
}     