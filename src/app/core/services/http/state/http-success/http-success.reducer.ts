import { Reducer } from 'src/app/state/interfaces';
import { HttpQueueShiftReducer } from '../http-queue-shift.reducer';
import { HttpSuccessActionId } from './http-success-command.interface';

export const HttpSuccessReducer: Reducer<any> = {
    ...HttpQueueShiftReducer,
    actionId: HttpSuccessActionId,
}    