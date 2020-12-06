import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StateAction } from './interfaces/state-action.interface';

export interface DispatchedAction<TAction extends StateAction> { action: TAction, stateSnapshot: Readonly<any> };

@Injectable()
export class ActionDispatcher {

    constructor(){}

    private actionsSubject = new Subject<DispatchedAction<StateAction>>();
    actions$ = this.actionsSubject.asObservable();

    dispatch(action: StateAction, stateSnapshot?: Readonly<any>){
        this.actionsSubject.next({action, stateSnapshot});
    }
}