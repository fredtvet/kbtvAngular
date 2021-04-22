import { StateAction } from "state-management";

export const HttpQueueShiftAction = "HTTP_QUEUE_SHIFT_ACTION";
/** Represents an action used to remove the first request in queue */
export interface HttpQueueShiftAction extends StateAction<typeof HttpQueueShiftAction> {}
