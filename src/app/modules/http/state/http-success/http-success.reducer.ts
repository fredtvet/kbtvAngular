import { Reducer } from '@state/interfaces';
import { HttpQueueShiftReducer } from '../http-queue-shift.reducer';
import { HttpSuccessActionId, HttpSuccessCommand } from './http-success-command.interface';

export const HttpSuccessReducer: Reducer<any, HttpSuccessCommand> = {
    ...HttpQueueShiftReducer,
    actionId: HttpSuccessActionId,
}    