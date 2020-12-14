import { Immutable } from '@immutable/interfaces';
import { Reducer } from '../interfaces';
import { StateAction } from '../state.action';
import { _cloneInstance } from './clone-instance.helper';
import { _deepClone } from './deep-clone.helper';

export function _mergeReducers(reducers: Reducer<any, StateAction>[], action: StateAction): Reducer<any, StateAction> {
    return <Reducer<any, StateAction>>{action,
        reducerFn: (state: Immutable<Object>, action: any): any => {
            let fullState: any = {...state};
            let newState: any; 
            for(const reducer of reducers) {
                const inputAction = _cloneInstance(action, !reducer.noDeepCloneAction);
                const reducerState = reducer.reducerFn(fullState, inputAction);
                if(!reducerState) continue;
                fullState = {...fullState, ...reducerState} //merge total state for next reducer
                newState = {...newState || {}, ...reducerState} //Store all new state to prevent emitting entire state
            }
            return newState;
        },
    }
}     