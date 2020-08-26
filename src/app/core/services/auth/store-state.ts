import { StateCurrentUser, StateAccessToken, StateRefreshToken } from '../../state/global.state';

export interface StoreState extends
    StateCurrentUser,
    StateRefreshToken,
    StateAccessToken {
}