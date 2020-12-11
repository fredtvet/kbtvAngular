import { Reducer } from '@state/interfaces';
import { HttpQueueShiftReducer } from '../http-queue-shift.reducer';
import { HttpSuccessAction } from './http-success.action';

export const HttpSuccessReducer: Reducer<any, HttpSuccessAction> = {
    ...HttpQueueShiftReducer,
    action: HttpSuccessAction,
}    