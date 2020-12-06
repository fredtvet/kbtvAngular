import { _deepClone } from 'src/app/shared-app/helpers/deep-clone.helper';
import { Reducer, StateAction } from '../interfaces';

export function _reduceStateFunc(reducers: Reducer<any>[], action: StateAction){
    return (state: any): any => {
        for(const reducer of reducers) {
            const inputAction = reducer.noDeepCloneAction ? action : _deepClone(action);
            const inputState = reducer.noDeepCloneState ? state : _deepClone(state);
            state = {...state, ...reducer.reducerFn(inputState, inputAction)}
        }
        return state;
    }
}     