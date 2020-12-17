import { Inject, Injectable, Optional } from '@angular/core';
import { Immutable, UnknownState } from '@global/interfaces';
import { DispatchedAction, Effect } from '@state/interfaces';
import { listenTo } from '@state/operators/listen-to.operator';
import { StateAction } from '@state/state.action';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OPTIMISTIC_STATE_SELECTOR } from '../injection-tokens.const';
import { HttpRequest, OptimisticStateSelector } from '../interfaces';
import { HttpQueuePushAction } from './http-queue-push/http-queue-push.action';

export const HttpAction = "HTTP_ACTION";
export interface HttpAction extends StateAction {
    request: HttpRequest, 
    stateSnapshot: Immutable<{}>
}

@Injectable()
export class HttpEffect implements Effect<HttpAction> {

    constructor(
        @Inject(OPTIMISTIC_STATE_SELECTOR) @Optional() private stateSelector: OptimisticStateSelector<UnknownState>
    ) { 
        this.setOptimistictStateStrategy() 
    }

    handle$(actions$: Observable<DispatchedAction<HttpAction>>): Observable<HttpQueuePushAction> {
        return actions$.pipe(
            listenTo([HttpAction]),
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