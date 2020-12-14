import { _addOrUpdateRange } from '@array/add-or-update-range.helper';
import { _removeRangeByIdentifier } from '@array/remove-range-by-identifier.helper';
import { _createReducer } from '@state/helpers/create-reducer.helper';
import { Immutable } from '@immutable/interfaces';
import { StoreState } from '../interfaces';
import { SyncStateSuccessAction } from './actions';

export const SetSyncResponseReducer = _createReducer(
    SyncStateSuccessAction,
    (state: Immutable<StoreState>, action: Immutable<SyncStateSuccessAction>): any => {
        const newState = {syncTimestamp: action.response.timestamp};
        
        for(const prop in action.response.arrays){
            const propCfg = action.syncStateConfig[prop] as any; //Replace with new logic
            if(!propCfg) console.error(`No sync state config for property ${prop}`);

            const {deletedEntities, entities} = action.response.arrays[prop];
     
            if(deletedEntities?.length)
                newState[prop] = 
                    _removeRangeByIdentifier<any>(state[prop], deletedEntities, propCfg.identifier);

            if(entities?.length)
                newState[prop] = 
                    _addOrUpdateRange<any>(newState[prop] || state[prop], entities, propCfg.identifier); 
        }

        for(const prop in action.response.values){
            if(!action.syncStateConfig[prop]) console.error(`No sync state config for property ${prop}`);
            const value = action.response.values[prop];
            if(value) newState[prop] = value;
        }

        return newState;
    } 
)