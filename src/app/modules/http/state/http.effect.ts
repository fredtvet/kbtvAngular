import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { _deepClone } from '@shared-app/helpers/deep-clone.helper';
import { DispatchedAction } from '@state/action-dispatcher';
import { StateAction } from '@state/interfaces';
import { Effect } from '@state/interfaces/effect.interface';
import { listenTo } from '@state/operators/listen-to.operator';
import { OPTIMISTIC_STATE_SELECTOR } from '../injection-tokens.const';
import { HttpRequest, OptimisticStateSelector } from '../interfaces';
import { HttpQueuePushActionId, HttpQueuePushCommand } from './http-queue-push/http-queue-push-command.interface';

export const HttpActionId = "HTTP";

export interface HttpCommand extends StateAction { request: HttpRequest, stateSnapshot: Readonly<any> }

@Injectable()
export class HttpEffect implements Effect<HttpCommand> {

    constructor(
        @Inject(OPTIMISTIC_STATE_SELECTOR) @Optional() private stateSelector: OptimisticStateSelector<any>
    ) { 
        this.setOptimistictStateStrategy() 
    }

    handle$(actions$: Observable<DispatchedAction<HttpCommand>>): Observable<HttpQueuePushCommand> {
        return actions$.pipe(
            listenTo([HttpActionId], false),
            map(x => { 
                return <HttpQueuePushCommand>{
                    actionId: HttpQueuePushActionId,
                    command: {
                       request: x.action.request, 
                       stateSnapshot: this.getOptimisticState(x.action.stateSnapshot)
                    }
                };
            })
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