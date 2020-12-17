import { Immutable, ImmutableArray, Maybe, UnknownState } from '@global/interfaces';
import { Observable } from 'rxjs';
import { filter, map } from "rxjs/operators";
import { _deepClone } from '../helpers/deep-clone.helper'
import { Prop, StateChanges } from '../interfaces';

export const selectProp = <TResult, TState = {}>(
    prop: Prop<Immutable<TState>>, 
    deepClone?: boolean) => 
    (source: Observable<StateChanges<TState>>): Observable<TResult> => 
        source.pipe(
            filter<StateChanges<TState>>(({stateChanges}, index: number) => 
                (index === 0 || stateChanges.hasOwnProperty(prop)) ? true : false),
            map(({state}) => deepClone ? <TResult>_deepClone(state[prop]) : <TResult>state[prop])
        )

export const selectSlice = <TSlice extends {}>(
    props: Maybe<ImmutableArray<string>>, 
    deepClone?: boolean) => 
    (source: Observable<StateChanges<unknown>>): Observable<TSlice> => 
        source.pipe(
            filter<StateChanges<unknown>>(({stateChanges}, index: number) => {
                if(index === 0 || !props) return true;
                for(const prop of props)
                    if(stateChanges.hasOwnProperty(prop)) return true; 
                return false;
            }),
            map(({state}) => {
                var slice = {} as UnknownState;
                if(state && props)     
                    for(var prop of props) slice[prop] = (<UnknownState> state)[prop]; 
                else slice = <UnknownState> state;
                return deepClone ? <TSlice> _deepClone(slice) : <TSlice>slice;                                    
            })
        )
