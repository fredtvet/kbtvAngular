import { Observable } from 'rxjs';
import { filter, map } from "rxjs/operators";
import { _deepClone } from '../helpers/deep-clone.helper'
import { StateChanges } from '../interfaces/state-changes.interface';

export const selectProp = <TResult>(prop: string, deepClone: boolean = true) => 
    (source: Observable<StateChanges<any>>): Observable<TResult> => 
        source.pipe(
            filter<StateChanges<any>>(({stateChanges}, index: number) => 
                (index === 0 || stateChanges.hasOwnProperty(prop)) ? true : false),
            map(({state}) => deepClone ? _deepClone(state[prop]) : state[prop])
        )

export const selectSlice = <TState>(props: string[], deepClone: boolean = true) => 
    (source: Observable<StateChanges<any>>): Observable<Partial<TState>> => 
        source.pipe(
            filter<StateChanges<any>>(({stateChanges}, index: number) => {
                if(index === 0) return true;
                for(const prop of props)
                    if(stateChanges.hasOwnProperty(prop)) return true; 
                return false;
            }),
            map(({state}) => {
                const slice: Partial<TState> = {};
                if(state)     
                    for(var prop of props || []) 
                        slice[prop] = state[prop]; 
                return deepClone ? _deepClone<Partial<TState>>(slice) : slice;                                    
            })
        )
