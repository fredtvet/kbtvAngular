import { Reducer } from '@state/interfaces';
import { WipeSyncStateActionId, WipeSyncStateCommand } from './actions.const';

export const WipeSyncStateReducer: Reducer<any> = {
    actionId: WipeSyncStateActionId, 
    reducerFn: (state: any, action: WipeSyncStateCommand): any => {

        const deleteState = {syncTimestamps: {}};

        for(const prop in action.syncStateConfig){
            const propCfg = action.syncStateConfig[prop];
            if(propCfg.wipeable !== false) deleteState[prop] = undefined;     
        }

        return deleteState;
    },
}