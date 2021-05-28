import { _createReducer } from "state-management";
import { StoreState } from "../interfaces";
import { RefreshTokenAction } from "./actions.const";

export const RemoveRefreshTokenReducer = _createReducer<StoreState, RefreshTokenAction>(
    RefreshTokenAction,
    () => { return { refreshToken: undefined } }
)