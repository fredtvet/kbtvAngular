import { Immutable } from 'global-types';
import { Reducer, _createReducer } from 'state-management';
import { StateRequestQueue } from '../interfaces';
import { HttpQueueShiftAction } from './http-queue-shift.action';

export const HttpQueueShiftReducer: Reducer<Immutable<StateRequestQueue>,HttpQueueShiftAction> = _createReducer(
    HttpQueueShiftAction,
    (state: Immutable<StateRequestQueue>) => {
        if(!state.requestQueue) return;
        const requestQueue = [...state.requestQueue];
        requestQueue.shift();
        return {requestQueue};
    }
)