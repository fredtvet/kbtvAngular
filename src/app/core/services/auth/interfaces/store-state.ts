import { StateCurrentUser } from 'src/app/core/state';
import { AccessToken } from './tokens.interface';

export interface StoreState extends
    StateCurrentUser {
        accessToken: AccessToken,
        refreshToken: string
}