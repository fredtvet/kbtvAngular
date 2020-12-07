import { Observable } from 'rxjs';
import { StateAction } from '.';
import { DispatchedAction } from '../action-dispatcher';

export interface Effect<TAction extends StateAction> {
    handle$(actions$: Observable<DispatchedAction<TAction>>): Observable<StateAction | void>
    onErrorAction?: (err: any) => StateAction
}