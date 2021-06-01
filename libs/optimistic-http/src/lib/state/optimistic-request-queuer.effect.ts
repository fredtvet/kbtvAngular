import { Injectable } from '@angular/core';
import { Immutable, UnknownState } from 'global-types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DispatchedAction, Effect, StateAction } from 'state-management';
import { _commandIdGenerator } from '../command-id-generator.helper';
import { ActionRequestConverterFn, OptimisticHttpRequest } from '../interfaces';
import { OptimisticProvidersService } from '../optimistic-providers.service';
import { HttpQueuePushAction } from './http-queue-push/http-queue-push.action';
import { OptimisticHttpAction } from './optimistic-http.action';

@Injectable()
export class OptimisticRequestQueuerEffect implements Effect<StateAction> {

    constructor(private optimisticProvidersService: OptimisticProvidersService) { }

    handle$(actions$: Observable<DispatchedAction<StateAction>>): Observable<Immutable<HttpQueuePushAction> | void> {
        return actions$.pipe(map(x => this.createQueuePushAction(x)))
    }

    private createQueuePushAction(dispatched: DispatchedAction<StateAction>): Immutable<HttpQueuePushAction> | void {
        if(dispatched.action.type === OptimisticHttpAction) 
            return this.onOptimisticHttpAction(<DispatchedAction<OptimisticHttpAction>> dispatched)

        const converter = this.optimisticProvidersService.actionMap[dispatched.action.type];
        if(converter !== undefined) return this.onRequestMapAction(dispatched, converter)
    }
    
    private onOptimisticHttpAction(dispatched: DispatchedAction<OptimisticHttpAction>): Immutable<HttpQueuePushAction> {
        return {
            type: HttpQueuePushAction,
            command: {
                request: dispatched.action.request, 
                stateSnapshot: this.getOptimisticState(dispatched.action.stateSnapshot),
            }    
        }
    }

    private onRequestMapAction(dispatched: DispatchedAction<StateAction>, fn: ActionRequestConverterFn<StateAction>): HttpQueuePushAction | void {
        const request = fn(dispatched.action);
        if(!request) return;
        return { type: HttpQueuePushAction,
            command: {
                request: <OptimisticHttpRequest> { ...request },
                stateSnapshot: this.getOptimisticState(dispatched.stateSnapshot),
            }
        }
    }
    
    private getOptimisticState(state: Immutable<UnknownState>): UnknownState {  
        const stateProps = this.optimisticProvidersService.optimisticStateProps;  
        if(!stateProps.length) return state; 
        let returnState: UnknownState = {};
        for(const prop of stateProps) returnState[prop] = state[prop]; 
        return returnState;
    };

}