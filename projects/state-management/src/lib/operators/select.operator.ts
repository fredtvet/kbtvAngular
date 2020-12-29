import { ImmutableArray, Prop, Immutable, UnknownState } from "global-types";
import { Observable } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";
import { _selectSlice } from "../helpers/select-slice.helper";

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