import { Immutable } from 'global-types';
import { Reducer, _createReducer } from 'state-management';
import { StateRequestQueue } from '../../interfaces';
import { _requestQueueShift } from '../http-queue-shift.reducer';
import { HttpSuccessAction } from './http-success.action';

export const HttpSuccessReducer: Reducer<Immutable<StateRequestQueue>, HttpSuccessAction> = _createReducer(
    HttpSuccessAction,
    _requestQueueShift,
) 