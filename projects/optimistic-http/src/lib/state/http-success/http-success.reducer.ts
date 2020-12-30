import { Immutable } from 'global-types';
import { Reducer, _createReducer } from 'state-management'
import { StateRequestQueue } from '../../interfaces';
import { HttpQueueShiftReducer } from '../http-queue-shift.reducer';
import { HttpSuccessAction } from './http-success.action';

export const HttpSuccessReducer: Reducer<Immutable<StateRequestQueue>, HttpSuccessAction> = _createReducer(
    HttpSuccessAction,
    HttpQueueShiftReducer.reducerFn,
) 