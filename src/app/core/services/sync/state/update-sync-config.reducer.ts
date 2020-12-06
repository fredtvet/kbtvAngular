import { Reducer, StateSyncConfig } from 'src/app/state/interfaces';
import { UpdateSyncConfigActionId, UpdateSyncConfigCommand } from './actions.const';

export const UpdateSyncConfigReducer: Reducer<StateSyncConfig> = {
    actionId: UpdateSyncConfigActionId, stateProperties: ['syncConfig'],
    reducerFn: (state: any, action: UpdateSyncConfigCommand) => {
        return {syncConfig: {...state.syncConfig, ...action.syncConfig} }
    }
}