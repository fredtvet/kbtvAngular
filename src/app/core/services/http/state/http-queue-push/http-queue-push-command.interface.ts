import { StateAction } from 'src/app/state/interfaces';
import { QueuedCommand } from '../../interfaces';

export const HttpQueuePushActionId = "HTTP_QUEUE_PUSH";

export interface HttpQueuePushCommand extends StateAction {
    command: QueuedCommand
}