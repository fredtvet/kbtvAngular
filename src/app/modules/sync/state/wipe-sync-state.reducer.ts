import { Reducer } from '@state/interfaces';
import { WipeSyncStateAction } from './actions';

export const WipeSyncStateReducer: Reducer<any, WipeSyncStateAction> = {
    action: WipeSyncStateAction, 
    reducerFn: (state: any, action: WipeSyncStateAction): any => {

        const deleteState = {syncTimestamp: null};

        for(const prop in action.syncStateConfig){
            const propCfg = action.syncStateConfig[prop];
            if(propCfg.wipeable !== false) deleteState[prop] = undefined;     
        }

        return deleteState;
    },
}