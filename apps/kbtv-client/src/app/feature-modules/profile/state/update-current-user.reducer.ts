import { UpdateCurrentUserAction } from '@actions/profile-actions';
import { User } from '@core/models';
import { StateCurrentUser } from '@core/state/global-state.interfaces';
import { Immutable } from 'global-types';
import { CurrentUser } from 'state-auth';
import { _createReducer } from 'state-management';

export const UpdateCurrentUserReducer = _createReducer(
    UpdateCurrentUserAction,
    (state: Immutable<StateCurrentUser>, action: Immutable<UpdateCurrentUserAction>): Immutable<StateCurrentUser> => {
        return {currentUser: <User & CurrentUser>(state.currentUser ? {...state.currentUser, ...action.user} : action.user) };
    }
)