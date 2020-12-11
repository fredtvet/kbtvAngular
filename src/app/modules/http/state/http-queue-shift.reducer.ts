import { Reducer } from '@state/interfaces';
import { StateAction } from '@state/state.action';
import { StateRequestQueue } from '../interfaces';

export class HttpQueueShiftAction extends StateAction {}

export const HttpQueueShiftReducer: Reducer<StateRequestQueue, HttpQueueShiftAction> = {
    action: HttpQueueShiftAction,
    stateProperties: ['requestQueue'],
    noDeepCloneState: true,
    reducerFn: (state: StateRequestQueue, action: HttpQueueShiftAction) => {
        if(!state.requestQueue) return null;
        const requestQueue = [...state.requestQueue];
        requestQueue.shift();
        return {requestQueue};
    }
}