import { StateAction } from '@state/interfaces';

export const LogoutActionId = "LOGOUT";

export interface LogoutCommand extends StateAction { refreshToken?: string, returnUrl?: string}