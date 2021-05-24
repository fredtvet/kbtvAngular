import { StateAction } from 'state-management';

export const DispatchNextHttpAction = "DISPATCH_NEXT_HTTP_ACTION";
export interface DispatchNextHttpAction extends StateAction<typeof DispatchNextHttpAction> { }