import { Reducer, StateAction } from '@state/interfaces';
import { StateRequestQueue } from '../interfaces';

export const HttpQueueShiftActionId = "HTTP_QUEUE_SHIFT";

export const HttpQueueShiftReducer: Reducer<StateRequestQueue, StateAction> = {
    actionId: HttpQueueShiftActionId,
    stateProperties: ['requestQueue'],
    noDeepCloneState: true,
    reducerFn: (state: StateRequestQueue, action: StateAction) => {
        if(!state.requestQueue) return null;
        const requestQueue = [...state.requestQueue];
        requestQueue.shift();
        return {requestQueue};
    }
}