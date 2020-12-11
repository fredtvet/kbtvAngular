import { Inject, Injectable, Optional } from '@angular/core';
import { DispatchedAction, Effect } from '@state/interfaces';
import { listenTo } from '@state/operators/listen-to.operator';
import { StateAction } from '@state/state.action';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OPTIMISTIC_STATE_SELECTOR } from '../injection-tokens.const';
import { HttpRequest, OptimisticStateSelector } from '../interfaces';
import { HttpQueuePushAction } from './http-queue-push/http-queue-push.action';

export class HttpAction extends StateAction {
    constructor(
        public request: HttpRequest, 
        public stateSnapshot: Readonly<any>
    ){ super() }
    
    propagate: boolean = true;
}
@Injectable()
export class HttpEffect implements Effect<HttpAction> {

    constructor(
        @Inject(OPTIMISTIC_STATE_SELECTOR) @Optional() private stateSelector: OptimisticStateSelector<any>
    ) { 
        this.setOptimistictStateStrategy() 
    }

    handle$(actions$: Observable<DispatchedAction<HttpAction>>): Observable<HttpQueuePushAction> {
        return actions$.pipe(
            listenTo([HttpAction], false),
            map(x => new HttpQueuePushAction({
                request: x.action.request, 
                stateSnapshot: this.getOptimisticState(x.action.stateSnapshot)
            }))
        )
    }
    
    private getOptimisticState: (fullState: Readonly<Object>) => Object;

    private setOptimistictStateStrategy(): void {

        let stateGetter: (state: Readonly<Object>) => Object;

        if(this.stateSelector) //Only get state from custom props
            if(this.stateSelector.strategy === "include")
                stateGetter = (state: Readonly<Object>) => {
                    let returnState = {};
                    for(const prop of this.stateSelector.props)
                        returnState[prop] = state[prop]; 
                    return returnState;
                }       
            else
                stateGetter = (state: Readonly<Object>) => {
                    let returnState = state;
                    for(const prop of this.stateSelector.props) 
                        delete returnState[prop]
                    return returnState;
                }         
        else //If no custom props, use full state   
            stateGetter = (state: Readonly<Object>) => state;
        
        this.getOptimisticState = stateGetter;
    }

}