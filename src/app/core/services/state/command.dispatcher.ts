import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ClonerService } from '../utility/cloner.service';
import { ObservableStore } from './abstracts/observable-store';
import { StateCommand } from './interfaces/state-command.interface';
import { ObservableStoreBase } from './observable-store-base';
import { OptimisticStateConfig } from './optimistic-state.config';

export interface DispatchedCommand<TCommand extends StateCommand> { command: TCommand, state: any };

@Injectable({ providedIn: 'root' })
export class CommandDispatcher extends ObservableStore<any> {

    private dispatchSubject = new Subject<DispatchedCommand<StateCommand>>();
    private dispatched$ = this.dispatchSubject.asObservable();

    constructor(
        base: ObservableStoreBase,
        private clonerService: ClonerService,
    ) {
        super(base);
    }

    listen$<TCommand extends StateCommand>(action: string): Observable<DispatchedCommand<TCommand>> {
        return this.dispatched$.pipe(
            filter(x => x.command.action === action),  
            map(x => { 
                return {...x, command: this.clonerService.deepClone(x.command)}
            }
        ));
    }

    dispatch<TCommand extends StateCommand>(command: TCommand, noStateSnapshot?:boolean): void {
        if (!command?.action) console.error("No state command or action was provided");
        const state = noStateSnapshot ? null : this.getOptimisticState();
        this.dispatchSubject.next({ command, state })
    }

    private getOptimisticState(): Object {
        return this.getStateProperties(Object.keys(OptimisticStateConfig) as any, false);
    }

}
