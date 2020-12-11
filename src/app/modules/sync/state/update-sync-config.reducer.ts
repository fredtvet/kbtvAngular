
import { Reducer } from '@state/interfaces';
import { StateSyncConfig } from '../interfaces';
import { UpdateSyncConfigAction } from './actions';

export const UpdateSyncConfigReducer: Reducer<StateSyncConfig, UpdateSyncConfigAction> = {
    action: UpdateSyncConfigAction, stateProperties: ['syncConfig'],
    reducerFn: (state: any, action: UpdateSyncConfigAction) => {
        return {syncConfig: {...state.syncConfig, ...action.syncConfig} }
    }
}