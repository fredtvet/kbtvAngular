import { Prop, Immutable } from "global-types";
import { Observable } from "rxjs";
import { distinctUntilKeyChanged, map } from "rxjs/operators";

/** An rxjs operator used to select a specified property from state 
 *  and only emit when its value changes.
 * @param prop The property on state that should be selected.
 * @returns The value that corresponds with the specified property on state
 */
export const selectProp = <TState, TResult>(prop: Prop<Immutable<TState>>) => 
    (source: Observable<Immutable<TState>>): Observable<Immutable<TResult>> => 
        source.pipe(
            distinctUntilKeyChanged(prop),
            map(x => <Immutable<TResult>> x[prop])
        )

