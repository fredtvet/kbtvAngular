
import { Immutable } from 'global-types';
import { _createReducer } from 'state-management'
import { StateSyncConfig } from '@sync/interfaces';
import { UpdateSyncConfigAction } from './actions';

export const UpdateSyncConfigReducer = _createReducer(
    UpdateSyncConfigAction,
    (state: Immutable<StateSyncConfig>, action: Immutable<UpdateSyncConfigAction>) => {
        return {syncConfig: {...state.syncConfig, ...action.syncConfig} }
    }
)