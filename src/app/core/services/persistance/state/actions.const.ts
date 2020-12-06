import { StateAction } from 'src/app/state/interfaces';

export interface SetStateCommand extends StateAction { state: any; }

export const LoadPersistedStateActionId = "LOAD_PERSISTED_STATE";

export const SetPersistedCriticalStateActionId = "SET_PERSISTED_CRITICAL_STATE";
export const SetPersistedStateActionId = "SET_PERSISTED_STATE";