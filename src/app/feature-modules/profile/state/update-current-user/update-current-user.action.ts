import { User } from '@core/models';
import { StateAction } from '@state/state.action';

export class UpdateCurrentUserAction extends StateAction{
    constructor(public user: User){ super() };
}