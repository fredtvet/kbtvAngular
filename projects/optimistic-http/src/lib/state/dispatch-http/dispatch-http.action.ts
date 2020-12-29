import { StateAction } from 'state-management'
import { OptimisticHttpRequest } from '../../interfaces';

export const DispatchHttpAction = "DISPATCH_HTTP_ACTION";
export interface DispatchHttpAction extends StateAction {
    request: OptimisticHttpRequest
}