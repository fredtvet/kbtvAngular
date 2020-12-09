import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { _deepClone } from '../helpers/deep-clone.helper'
import { DispatchedAction } from '../action-dispatcher';
import { StateAction } from '../interfaces';

export const listenTo = <TAction extends StateAction>(actionIds: string[], deepCloneAction: boolean = true) => 
    (source: Observable<DispatchedAction<TAction>> ): Observable<DispatchedAction<TAction>> => 
        source.pipe(
            filter(dispatched => {
                if(actionIds.length === 1) 
                    return dispatched.action.actionId === actionIds[0]
                return actionIds.find(id => id === dispatched.action.actionId) !== undefined
            }),  
            map(dispatched => {
                return {
                    ...dispatched, 
                    action: deepCloneAction ? _deepClone<TAction>(dispatched.action) : {...dispatched.action}
                }
            })
        )