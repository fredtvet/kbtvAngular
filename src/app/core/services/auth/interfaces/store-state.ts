import { StateCurrentUser } from '../../state/interfaces/global-state.interfaces';
import { AccessToken } from './tokens.interface';

export interface StoreState extends
    StateCurrentUser {
        accessToken: AccessToken,
        refreshToken: string
}