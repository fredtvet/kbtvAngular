import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DispatchedAction, StateAction } from './interfaces';

@Injectable()
export class ActionDispatcher {

    private actionsSubject = new Subject<DispatchedAction<StateAction>>();
    actions$ = this.actionsSubject.asObservable();

    dispatch(action: StateAction, stateSnapshot?: Readonly<any>){
        this.actionsSubject.next({action, stateSnapshot});
    }
    
}