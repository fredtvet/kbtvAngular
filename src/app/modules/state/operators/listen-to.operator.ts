import { _convertArrayToObject } from '@array/convert-array-to-object.helper';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { _deepClone } from '../helpers/deep-clone.helper';
import { DispatchedAction } from '../interfaces';
import { StateAction } from '../state.action';

export const listenTo = <TAction extends StateAction, TState>(types: string[], deepCloneAction: boolean = true) => {
    const typeLookup: {[key: string]: string} = _convertArrayToObject(types);
    return (source: Observable<DispatchedAction<TAction, TState>> ): Observable<DispatchedAction<TAction, TState>> => 
        source.pipe(
            filter(dispatched => typeLookup[dispatched.action.type] !== undefined),  
            map(dispatched => { 
                return {
                    ...dispatched, 
                    action: deepCloneAction ? _deepClone<TAction>(dispatched.action) : dispatched.action
                }
            })
        )
}