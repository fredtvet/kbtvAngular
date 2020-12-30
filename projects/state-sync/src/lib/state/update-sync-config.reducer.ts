import { StateSyncConfig } from '../interfaces';
import { Immutable } from 'global-types';
import { Reducer, _createReducer } from 'state-management'
import { UpdateSyncConfigAction } from './actions';

export const UpdateSyncConfigReducer: Reducer<Immutable<StateSyncConfig>, UpdateSyncConfigAction> = _createReducer(
    UpdateSyncConfigAction,
    (state: Immutable<StateSyncConfig>, action: Immutable<UpdateSyncConfigAction>) => {
        return {syncConfig: {...state.syncConfig, ...action.syncConfig} }
    }
)