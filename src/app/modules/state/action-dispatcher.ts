import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DispatchedAction } from './interfaces';
import { StateAction } from './state.action';

@Injectable()
export class ActionDispatcher {

    private actionsSubject = new Subject<DispatchedAction<StateAction>>();
    actions$ = this.actionsSubject.asObservable();

    dispatch(action: StateAction, stateSnapshot?: Readonly<unknown>){
        this.actionsSubject.next({action, stateSnapshot});
    }
    
}