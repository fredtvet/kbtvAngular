import { Immutable, ImmutableArray } from '@immutable/interfaces';
import { Reducer } from '../interfaces';
import { StateAction } from '../state.action';
import { _cloneInstance } from './clone-instance.helper';
import { _deepClone } from './deep-clone.helper';

export function _mergeReducers(reducers: ImmutableArray<Reducer<Object, StateAction>>, type: string): Reducer<Object, StateAction> {
    return <Reducer<Object, StateAction>>{type,
        reducerFn: (state: Immutable<Object>, action: Immutable<StateAction>): unknown => {
            let fullState: Object = {...state};
            let newState: Object; 
            for(const reducer of reducers) {
                const reducerState = reducer.reducerFn(fullState, action);
                if(!reducerState) continue;
                fullState = {...fullState, ...reducerState} //merge total state for next reducer
                newState = {...newState || {}, ...reducerState} //Store all new state to prevent emitting entire state
            }
            return newState;
        },
    }
}     