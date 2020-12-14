import { StateCurrentUser } from '@core/state/global-state.interfaces';
import { _createReducer } from '@state/helpers/create-reducer.helper';
import { Immutable } from '@immutable/interfaces';
import { UpdateCurrentUserAction } from './update-current-user.action';

export const UpdateCurrentUserReducer= _createReducer(
    UpdateCurrentUserAction,
    (state: Immutable<StateCurrentUser>, action: UpdateCurrentUserAction): Immutable<StateCurrentUser> => {
        return {currentUser: {...state.currentUser, ...action.user}};
    }
)