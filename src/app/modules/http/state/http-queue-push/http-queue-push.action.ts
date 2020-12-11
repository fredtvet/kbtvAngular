import { StateAction } from '@state/state.action';
import { QueuedCommand } from '../../interfaces';

export class HttpQueuePushAction extends StateAction {
    constructor(public command: QueuedCommand){ super() }
}