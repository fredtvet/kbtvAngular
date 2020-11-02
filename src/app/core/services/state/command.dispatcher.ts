import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { _deepClone } from 'src/app/shared-app/helpers/deep-clone.helper';
import { ObservableStore } from './abstracts/observable-store';
import { StateCommand } from './interfaces/state-command.interface';
import { OptimisticStateConfig } from './optimistic-state.config';

export interface DispatchedCommand<TCommand extends StateCommand> { command: TCommand, state: any };

@Injectable({ providedIn: 'root' })
export class CommandDispatcher extends ObservableStore<any> {

    private dispatchSubject = new Subject<DispatchedCommand<StateCommand>>();
    private dispatched$ = this.dispatchSubject.asObservable();

    constructor() { super() }

    listen$<TCommand extends StateCommand>(action: string): Observable<DispatchedCommand<TCommand>> {
        return this.dispatched$.pipe(
            filter(x => x.command.action === action),  
            map(x => { 
                return {...x, command: _deepClone(x.command)}
            }
        ));
    }

    dispatch<TCommand extends StateCommand>(command: TCommand, noStateSnapshot?:boolean): void {
        if (!command?.action) console.error("No state command or action was provided");
        const state = noStateSnapshot ? null : this.getOptimisticState();
        this.dispatchSubject.next({ command, state })
    }

    // select$(query: )

    private getOptimisticState(): Object {
        return this.getStateProperties(Object.keys(OptimisticStateConfig) as any, false);
    }

}
