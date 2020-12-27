import { Injectable } from '@angular/core';
import { Immutable, Maybe } from '@global/interfaces';
import { Subject } from 'rxjs';
import { DispatchedAction } from './interfaces';
import { StateAction } from './state.action';

@Injectable()
export class ActionDispatcher {

    private actionsSubject = new Subject<DispatchedAction<StateAction>>();
    actions$ = this.actionsSubject.asObservable();

    dispatch(action: StateAction, stateSnapshot: Immutable<{}>){
        this.actionsSubject.next({action, stateSnapshot});
    }
    
}