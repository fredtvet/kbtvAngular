import { Inject, Injectable, Optional } from '@angular/core';
import { Immutable, UnknownState } from 'global-types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DispatchedAction, Effect, listenTo } from 'state-management';
import { OPTIMISTIC_STATE_SELECTOR } from '../injection-tokens.const';
import { OptimisticStateSelector } from '../interfaces';
import { HttpQueuePushAction } from './http-queue-push/http-queue-push.action';
import { OptimisticHttpAction } from './optimistic-http.action';

@Injectable()
export class OptimisticHttpEffect implements Effect<OptimisticHttpAction> {

    constructor(
        @Inject(OPTIMISTIC_STATE_SELECTOR) @Optional() private stateSelector: OptimisticStateSelector<UnknownState>
    ) { 
        this.setOptimistictStateStrategy() 
    }

    handle$(actions$: Observable<DispatchedAction<OptimisticHttpAction>>): Observable<HttpQueuePushAction> {
        return actions$.pipe(
            listenTo([OptimisticHttpAction]),
            map(x => <HttpQueuePushAction>{
                type: HttpQueuePushAction,
                command: {
                    request: x.action.request, 
                    stateSnapshot: this.getOptimisticState(x.action.stateSnapshot)
                }    
            })
        )
    }
    
    private getOptimisticState: (fullState: Immutable<{}>) => {};

    private setOptimistictStateStrategy(): void {

        let stateGetter: (state: Immutable<{}>) => {};

        if(this.stateSelector) //Only get state from custom props
            if(this.stateSelector.strategy === "include")
                stateGetter = (state: Immutable<UnknownState>) => {
                    let returnState: UnknownState = {};
                    for(const prop of this.stateSelector.props)
                        returnState[prop] = state[prop]; 
                    return returnState;
                }       
            else
                stateGetter = (state: Immutable<UnknownState>) => {
                    let returnState = {...state};
                    for(const prop of this.stateSelector.props) 
                        returnState[prop] = undefined
                    return returnState;
                }         
        else //If no custom props, use full state   
            stateGetter = (state: Immutable<UnknownState>) => state;
        
        this.getOptimisticState = stateGetter;
    }

}