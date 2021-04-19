import { ApplicationRef, Inject, Injectable, Optional, PlatformRef } from '@angular/core';
import { Immutable, Maybe, UnknownState } from 'global-types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo, StateAction } from 'state-management';
import { HttpQueuePushAction } from './http-queue-push/http-queue-push.action';
import { OptimisticHttpAction } from './optimistic-http.action';
import { OptimisticStateService } from '../optimistic-state.service';
import { ActionRequestMap, OptimisticHttpRequest } from '../interfaces';
import { ACTION_REQUEST_MAP } from '../injection-tokens.const';

@Injectable()
export class OptimisticRequestQueuerEffect implements Effect<StateAction> {
    
    private actions: string[] = [OptimisticHttpAction];

    constructor(
        private optimisticStateService: OptimisticStateService,
        @Inject(ACTION_REQUEST_MAP) private apiMap: ActionRequestMap<string>
    ) { 
        this.actions = this.actions.concat(Object.keys(this.apiMap))
    }

    handle$(actions$: Observable<DispatchedAction<StateAction>>): Observable<HttpQueuePushAction | void> {
        return actions$.pipe(
            listenTo(this.actions),
            map(x => this.createQueuePushAction(x))
        )
    }

    private createQueuePushAction(dispatched: DispatchedAction<StateAction>): HttpQueuePushAction | void {
        if(dispatched.action.type === OptimisticHttpAction) 
            return this.onOptimisticHttpAction(<DispatchedAction<OptimisticHttpAction>> dispatched)
        else 
            return this.onRequestMapAction(dispatched)
    }
    
    private onOptimisticHttpAction(dispatched: DispatchedAction<OptimisticHttpAction>): HttpQueuePushAction{
        return {
            type: HttpQueuePushAction, propagate: true,
            command: {
                request: dispatched.action.request, 
                stateSnapshot: this.getOptimisticState(dispatched.action.stateSnapshot),
            }    
        }
    }

    private onRequestMapAction(dispatched: DispatchedAction<StateAction>): HttpQueuePushAction | void {
        const request = this.apiMap[dispatched.action.type]?.(dispatched.action);
        if(!request) return;
        return {
            type: HttpQueuePushAction, propagate: true,
            command: {
                request: <OptimisticHttpRequest> { ...request, callerAction: dispatched.action },
                stateSnapshot: this.getOptimisticState(dispatched.stateSnapshot)
            }
        }
    }
    
    private getOptimisticState(state: Immutable<UnknownState>): UnknownState {  
        const stateProps = this.optimisticStateService.optimisticStateProps;  
        if(!stateProps.length) return state; 
        let returnState: UnknownState = {};
        for(const prop of stateProps) returnState[prop] = state[prop]; 
        return returnState;
    };

}