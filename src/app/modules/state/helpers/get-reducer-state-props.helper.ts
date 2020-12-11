import { Reducer } from '../interfaces';
import { StateAction } from '../state.action';

export function _getReducerStateProps(
    reducer: Readonly<Reducer<any, StateAction>>, 
    action: Readonly<StateAction>): string[] | 'all' {

    if(!reducer.stateProperties) return;

    if(reducer.stateProperties === "all") return "all";
    
    if(reducer.stateProperties instanceof Function)
        return reducer.stateProperties(action);
    else 
        return reducer.stateProperties
}

