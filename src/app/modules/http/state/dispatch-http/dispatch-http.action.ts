import { StateAction } from '@state/state.action';
import { HttpRequest } from '../../interfaces';

export class DispatchHttpAction extends StateAction { 
    constructor(public request: HttpRequest){ super() } 
}