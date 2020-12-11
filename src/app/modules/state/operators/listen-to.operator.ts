import { StateAction } from '../state.action';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { _deepClone } from '../helpers/deep-clone.helper'
import { DispatchedAction } from '../interfaces';
import { Type } from '@angular/core';
import { _cloneInstance } from '@state/helpers/clone-instance.helper';

export const listenTo = <TAction extends StateAction>(actions: Type<StateAction>[], deepCloneAction: boolean = true) => 
    (source: Observable<DispatchedAction<TAction>> ): Observable<DispatchedAction<TAction>> => 
        source.pipe(
            filter(dispatched => {
                const actionName = dispatched.action.constructor.name;
                if(actions.length === 1) return actionName === actions[0].name
                return actions.find(action => action.name === actionName) !== undefined
            }),  
            map(dispatched => {
                return {
                    ...dispatched, 
                    action: _cloneInstance<TAction>(dispatched.action, deepCloneAction)
                }
            })
        )