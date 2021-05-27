import { ImmutableObject } from 'global-types';
import { Reducer, _createReducer } from 'state-management';
import { QueuedCommand, StateRequestQueue } from '../interfaces';
import { HttpQueueShiftAction } from './http-queue-shift.action';

export const HttpQueueShiftReducer: Reducer<StateRequestQueue, HttpQueueShiftAction> = _createReducer(
    HttpQueueShiftAction,
    (state) => {
        if(!state.requestQueue) return;
        const requestQueue: ImmutableObject<QueuedCommand>[] = [...state.requestQueue];
        requestQueue.shift();
        return {requestQueue};
    }
)