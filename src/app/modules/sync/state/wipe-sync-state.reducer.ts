import { _createReducer } from '@state/helpers/create-reducer.helper';
import { Immutable } from '@immutable/interfaces';
import { WipeSyncStateAction } from './actions';

export const WipeSyncStateReducer= _createReducer(
    WipeSyncStateAction, 
    (state: any, action: Immutable<WipeSyncStateAction>): any => {

        const deleteState = {syncTimestamp: null};

        for(const prop in action.syncStateConfig){
            const propCfg = action.syncStateConfig[prop];
            if(propCfg.wipeable !== false) deleteState[prop] = undefined;     
        }

        return deleteState;
    }, false
)