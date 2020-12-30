import { Immutable } from 'global-types';
import { Reducer, _createReducer } from 'state-management';
import { StateRequestQueue } from '../../interfaces';
import { HttpErrorAction } from './http-error.action';

export const HttpErrorReducer: Reducer<Immutable<StateRequestQueue>, HttpErrorAction> = _createReducer(
    HttpErrorAction,
    (state: Immutable<StateRequestQueue>) => {
        if(!state.requestQueue) return;
        const currentRequest = state.requestQueue[0];
        return { ...currentRequest.stateSnapshot, requestQueue: [] };
    }
)