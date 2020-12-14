import { Immutable, ImmutableArray } from '@immutable/interfaces';
import { Reducer } from '../interfaces';
import { StateAction } from '../state.action';
import { _cloneInstance } from './clone-instance.helper';
import { _deepClone } from './deep-clone.helper';

export function _mergeReducers(reducers: ImmutableArray<Reducer<any, StateAction>>, type: string): Reducer<any, StateAction> {
    return <Reducer<any, StateAction>>{type,
        reducerFn: (state: Immutable<Object>, action: any): any => {
            let fullState: any = {...state};
            let newState: any; 
            for(const reducer of reducers) {
                const inputAction = reducer.noDeepCloneAction ? _deepClone(action) : action;
                const reducerState = reducer.reducerFn(fullState, inputAction);
                if(!reducerState) continue;
                fullState = {...fullState, ...reducerState} //merge total state for next reducer
                newState = {...newState || {}, ...reducerState} //Store all new state to prevent emitting entire state
            }
            return newState;
        },
    }
}     