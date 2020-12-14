import { StateAction } from '@state/state.action';
import { QueuedCommand } from '../../interfaces';

export const HttpQueuePushAction = "HTTP_QUEUE_PUSH_ACTION";
export interface HttpQueuePushAction extends StateAction {
    command: QueuedCommand
}