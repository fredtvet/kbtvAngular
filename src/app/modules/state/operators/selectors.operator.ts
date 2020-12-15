import { ImmutableArray } from '@immutable/interfaces';
import { Observable } from 'rxjs';
import { filter, map } from "rxjs/operators";
import { _deepClone } from '../helpers/deep-clone.helper'
import { StateChanges } from '../interfaces';

export const selectProp = <TResult>(prop: string, deepClone?: boolean) => 
    (source: Observable<StateChanges<unknown>>): Observable<TResult> => 
        source.pipe(
            filter<StateChanges<unknown>>(({stateChanges}, index: number) => 
                (index === 0 || stateChanges.hasOwnProperty(prop)) ? true : false),
            map(({state}) => deepClone ? _deepClone(state[prop]) : state[prop])
        )

export const selectSlice = <TSlice>(props: ImmutableArray<string>, deepClone?: boolean) => 
    (source: Observable<StateChanges<unknown>>): Observable<TSlice> => 
        source.pipe(
            filter<StateChanges<unknown>>(({stateChanges}, index: number) => {
                if(index === 0) return true;
                for(const prop of props)
                    if(stateChanges.hasOwnProperty(prop)) return true; 
                return false;
            }),
            map(({state}) => {
                const slice = {} as TSlice;
                if(state)     
                    for(var prop of props || []) 
                        slice[prop] = state[prop]; 
                return deepClone ? _deepClone(slice) : slice;                                    
            })
        )
