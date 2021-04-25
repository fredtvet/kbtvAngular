import { _convertArrayToObject } from 'array-helpers';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DispatchedAction, StateAction } from '../interfaces';

/** An rxjs operator used to filter the types of actions provided from an action observer.
 * @param types The types of actions that should emit
 */
export const listenTo = <TAction extends StateAction, TState>(types: string[]) => {
    const typeLookup = _convertArrayToObject(types);
    return (source: Observable<DispatchedAction<TAction, TState>> ): Observable<DispatchedAction<TAction, TState>> => 
        source.pipe(
            filter(dispatched => typeLookup[dispatched.action.type] !== undefined),  
        )
}