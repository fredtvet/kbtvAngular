import { StateAction } from 'src/app/state/interfaces';

export const LogoutActionId = "LOGOUT";

export interface LogoutCommand extends StateAction { refreshToken?: string, returnUrl?: string}