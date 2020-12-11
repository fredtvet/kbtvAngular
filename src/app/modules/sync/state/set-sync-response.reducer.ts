import { _addOrUpdateRange } from '@array/add-or-update-range.helper';
import { _removeRangeByIdentifier } from '@array/remove-range-by-identifier.helper';
import { Reducer } from '@state/interfaces';
import { StoreState } from '../interfaces';
import { SyncStateSuccessAction } from './actions';

export const SetSyncResponseReducer: Reducer<any, SyncStateSuccessAction> = {
    action: SyncStateSuccessAction, noDeepCloneAction: true, noDeepCloneState: true,
    stateProperties: (action: SyncStateSuccessAction) => Object.keys(action.response.arrays),
    reducerFn: (unclonedState: Readonly<StoreState>, action: SyncStateSuccessAction): any => {
        const state = {...unclonedState, syncTimestamp: action.response.timestamp};

        for(const prop in action.response.arrays){

            const propCfg = action.syncStateConfig[prop] as any; //Replace with new logic
            if(!propCfg) console.error(`No sync state config for property ${prop}`);

            const {deletedEntities, entities} = action.response.arrays[prop];
  
            if(deletedEntities?.length)
                state[prop] = 
                    _removeRangeByIdentifier<any>(state[prop]?.slice(), deletedEntities, propCfg.identifier);

            if(entities?.length)
                state[prop] = 
                    _addOrUpdateRange<any>(state[prop]?.slice(), entities, propCfg.identifier); 
        }

        for(const prop in action.response.values){
            if(!action.syncStateConfig[prop]) console.error(`No sync state config for property ${prop}`);
            const value = action.response.values[prop];
            if(value) state[prop] = value;
        }

        return state;
    }
    
}