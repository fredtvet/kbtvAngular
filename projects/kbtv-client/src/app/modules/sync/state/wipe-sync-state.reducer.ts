import { Immutable, UnknownState } from '@global/interfaces';
import { _createReducer } from '@state/helpers/create-reducer.helper';
import { WipeSyncStateAction } from './actions';

export const WipeSyncStateReducer = _createReducer(
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