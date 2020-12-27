import { Immutable, ImmutableArray, UnknownState } from '@global/interfaces';
import { _selectSlice } from '@state/helpers/select-slice.helper';
import { Observable } from 'rxjs';
import { distinctUntilChanged, distinctUntilKeyChanged, map, tap } from "rxjs/operators";
import { Prop } from '../interfaces';

export const selectProp = <TState, TResult>(prop: Prop<Immutable<TState>>) => 
    (source: Observable<Immutable<TState>>): Observable<Immutable<TResult>> => 
        source.pipe(
            distinctUntilKeyChanged(prop),
            map(x => <Immutable<TResult>> x[prop])
        )

export const select = <TState, TSlice = Partial<TState>>(props: ImmutableArray<Prop<TState>>) => 
    (source: Observable<Immutable<TState>>): Observable<Immutable<TSlice>> => 
        source.pipe(
            distinctUntilChanged((a, b) => {
                let exp = true;
                for(const prop of props) exp = exp && ((<UnknownState>a)[prop] === (<UnknownState>b)[prop]);
                return exp;
            }),
            map(x => <Immutable<TSlice>> _selectSlice(x, props))
        )
