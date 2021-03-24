import { Immutable, UnknownState } from 'global-types';
import { Reducer, _createReducer } from 'state-management'
import { WipeSyncStateAction } from './actions';

export const WipeSyncStateReducer: Reducer<unknown, WipeSyncStateAction> = _createReducer(
    WipeSyncStateAction, 
    (state: unknown, action: Immutable<WipeSyncStateAction>) => {

        const deleteState: UnknownState = {syncTimestamp: null};

        for(const prop in action.syncStateConfig){
            const propCfg = action.syncStateConfig[prop];
            if(propCfg.wipeable !== false) deleteState[prop] = undefined;     
        }

        return deleteState;
    }
)