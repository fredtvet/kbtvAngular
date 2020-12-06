import { StateAction } from 'src/app/state/interfaces';
import { HttpRequest } from '../../interfaces';

export const DispatchHttpActionId = "DISPATCH_HTTP";

export interface DispatchHttpCommand extends StateAction { request: HttpRequest }