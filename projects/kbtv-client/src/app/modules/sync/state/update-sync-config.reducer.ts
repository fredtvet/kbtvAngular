
import { Immutable } from '@global/interfaces';
import { _createReducer } from '@state/helpers/create-reducer.helper';
import { StateSyncConfig } from '@sync/interfaces';
import { UpdateSyncConfigAction } from './actions';

export const UpdateSyncConfigReducer = _createReducer(
    UpdateSyncConfigAction,
    (state: Immutable<StateSyncConfig>, action: Immutable<UpdateSyncConfigAction>) => {
        return {syncConfig: {...state.syncConfig, ...action.syncConfig} }
    }
)