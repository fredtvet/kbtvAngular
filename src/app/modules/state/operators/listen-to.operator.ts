import { _convertArrayToObject } from '@array/convert-array-to-object.helper';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DispatchedAction } from '../interfaces';
import { StateAction } from '../state.action';

export const listenTo = <TAction extends StateAction, TState>(types: string[]) => {
    const typeLookup: {[key: string]: string} = _convertArrayToObject(types);
    return (source: Observable<DispatchedAction<TAction, TState>> ): Observable<DispatchedAction<TAction, TState>> => 
        source.pipe(
            filter(dispatched => typeLookup[dispatched.action.type] !== undefined),  
        )
}