import { _createReducer } from 'state-management'
import { HttpQueueShiftReducer } from '../http-queue-shift.reducer';
import { HttpSuccessAction } from './http-success.action';

export const HttpSuccessReducer = _createReducer(
    HttpSuccessAction,
    HttpQueueShiftReducer.reducerFn,
) 