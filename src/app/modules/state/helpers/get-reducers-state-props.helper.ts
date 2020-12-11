import { Reducer } from '../interfaces';
import { StateAction } from '../state.action';
import { _getReducerStateProps } from './get-reducer-state-props.helper';

export function _getReducersStateProps(
    reducers: ReadonlyArray<Reducer<any, StateAction>>, 
    action: Readonly<StateAction>): string[] | 'all' {

    let props = [];
    for(const reducer of reducers){
        const reducerProps = _getReducerStateProps(reducer, action);
        if(reducerProps === "all") return "all";
        if(!reducerProps?.length) continue;    
        props = props.concat(reducerProps);
    }
    return props;

}