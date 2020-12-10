
import { Reducer } from '@state/interfaces';
import { StateSyncConfig } from '../interfaces';
import { UpdateSyncConfigActionId, UpdateSyncConfigCommand } from './actions.const';

export const UpdateSyncConfigReducer: Reducer<StateSyncConfig, UpdateSyncConfigCommand> = {
    actionId: UpdateSyncConfigActionId, stateProperties: ['syncConfig'],
    reducerFn: (state: any, action: UpdateSyncConfigCommand) => {
        return {syncConfig: {...state.syncConfig, ...action.syncConfig} }
    }
}