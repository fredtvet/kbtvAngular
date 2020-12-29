import { Immutable } from 'global-types';
import { StateAction, _createReducer } from 'state-management';
import { StateRequestQueue } from '../interfaces';

export const HttpQueueShiftAction = "HTTP_QUEUE_SHIFT_ACTION";
export interface HttpQueueShiftAction extends StateAction {}

export const HttpQueueShiftReducer = _createReducer(
    HttpQueueShiftAction,
    (state: Immutable<StateRequestQueue>) => {
        if(!state.requestQueue) return;
        const requestQueue = [...state.requestQueue];
        requestQueue.shift();
        return {requestQueue};
    }
)