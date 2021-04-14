import { StateCurrentUser } from '@core/state/global-state.interfaces';
import { _createReducer } from 'state-management'
import { Immutable } from 'global-types';
import { UpdateCurrentUserAction } from '@actions/profile-actions';

export const UpdateCurrentUserReducer = _createReducer(
    UpdateCurrentUserAction,
    (state: Immutable<StateCurrentUser>, action: Immutable<UpdateCurrentUserAction>): Immutable<StateCurrentUser> => {
        return {currentUser: {...state.currentUser, ...action.user}};
    }
)