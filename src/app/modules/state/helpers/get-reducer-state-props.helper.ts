import { Reducer, StateAction } from '../interfaces';

export function _getReducerStateProps(reducers: ReadonlyArray<Reducer<any>>, action: Readonly<StateAction>): string[] | 'all' {
    let props = [];
    for(const reducer of reducers){
        if(reducer.stateProperties === "all") return "all";
        if(!reducer.stateProperties) continue;
        if(reducer.stateProperties instanceof Function)
            props = props.concat(reducer.stateProperties(action));
        else 
            props = props.concat(reducer.stateProperties)
    }
    return props;
}