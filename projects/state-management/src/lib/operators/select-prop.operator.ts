import { Prop, Immutable } from "global-types";
import { Observable } from "rxjs";
import { distinctUntilKeyChanged, map } from "rxjs/operators";

export const selectProp = <TState, TResult>(prop: Prop<Immutable<TState>>) => 
    (source: Observable<Immutable<TState>>): Observable<Immutable<TResult>> => 
        source.pipe(
            distinctUntilKeyChanged(prop),
            map(x => <Immutable<TResult>> x[prop])
        )

