import { Immutable, ImmutableObject } from 'global-types';
import { Reducer, _createReducer } from 'state-management';
import { QueuedCommand, StateRequestQueue } from '../interfaces';
import { HttpQueueShiftAction } from './http-queue-shift.action';

export const HttpQueueShiftReducer: Reducer<Immutable<StateRequestQueue>,HttpQueueShiftAction> = _createReducer(
    HttpQueueShiftAction,
    _requestQueueShift
)

export function _requestQueueShift(state: Immutable<StateRequestQueue>){
    if(!state.requestQueue) return;
    const requestQueue: ImmutableObject<QueuedCommand>[] = [...state.requestQueue];
    requestQueue.shift();
    return {requestQueue};
}