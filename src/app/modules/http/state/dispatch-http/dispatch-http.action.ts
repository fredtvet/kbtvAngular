import { StateAction } from '@state/state.action';
import { HttpRequest } from '../../interfaces';

export const DispatchHttpAction = "DISPATCH_HTTP_ACTION";
export interface DispatchHttpAction extends StateAction {
    request: HttpRequest
}