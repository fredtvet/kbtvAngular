import { Injectable } from '@angular/core';
import { Immutable } from 'global-types';
import { Observable, Subject } from 'rxjs';
import { DispatchedAction } from './interfaces';
import { StateAction } from './state.action';

/** Responsible for providing an action observer of dispatched actions. 
 *  Primarily used by {@link EffectsSubscriber} to handle effects. */
@Injectable()
export class ActionDispatcher {

    private actionsSubject = new Subject<DispatchedAction<StateAction>>();
    actions$: Observable<DispatchedAction<StateAction>> = this.actionsSubject.asObservable();

    dispatch(action: StateAction, stateSnapshot: Immutable<{}>){
        this.actionsSubject.next({action, stateSnapshot});
    }
    
}