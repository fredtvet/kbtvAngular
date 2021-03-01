import { Injectable } from '@angular/core';
import { Immutable, UnknownState } from 'global-types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo } from 'state-management';
import { HttpQueuePushAction } from './http-queue-push/http-queue-push.action';
import { OptimisticHttpAction } from './optimistic-http.action';
import { OptimisticStateService } from '../optimistic-state.service';

@Injectable()
export class OptimisticHttpEffect implements Effect<OptimisticHttpAction> {

    constructor(private optimisticStateService: OptimisticStateService) {}

    handle$(actions$: Observable<DispatchedAction<OptimisticHttpAction>>): Observable<HttpQueuePushAction> {
        return actions$.pipe(
            listenTo([OptimisticHttpAction]),
            map(x => <HttpQueuePushAction>{
                type: HttpQueuePushAction,
                command: {
                    request: x.action.request, 
                    stateSnapshot: this.getOptimisticState(x.action.stateSnapshot),
                }    
            })
        )
    }
    
    private getOptimisticState(state: Immutable<UnknownState>): UnknownState {  
        const stateProps = this.optimisticStateService.optimisticStateProps;  
        if(!stateProps.length) return state; 
        let returnState: UnknownState = {};
        for(const prop of stateProps) returnState[prop] = state[prop]; 
        return returnState;
    };

}