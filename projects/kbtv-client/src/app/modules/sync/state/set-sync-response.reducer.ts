import { _addOrUpdateRange } from '@array/add-or-update-range.helper';
import { _removeRangeByIdentifier } from '@array/remove-range-by-identifier.helper';
import { _createReducer } from '@state/helpers/create-reducer.helper';
import { Immutable, ImmutableArray, UnknownState } from 'global-types';
import { StoreState, SyncStatePropConfig } from '../interfaces';
import { SyncStateSuccessAction } from './actions';

export const SetSyncResponseReducer = _createReducer(
    SyncStateSuccessAction,
    (state: Immutable<StoreState>, action: Immutable<SyncStateSuccessAction>) => {
        const newState: UnknownState = {syncTimestamp: action.response.timestamp};
        
        for(const prop in action.response.arrays){
            const propCfg: SyncStatePropConfig = action.syncStateConfig[prop]; 
            if(!propCfg) console.error(`No sync state config for property ${prop}`);

            const {deletedEntities, entities} = action.response.arrays[prop];
            const stateSlice = <ImmutableArray<UnknownState>> (<Immutable<UnknownState>>state)[prop];

            if(deletedEntities?.length)
                newState[prop] = 
                    _removeRangeByIdentifier(stateSlice, deletedEntities, propCfg.identifier);

            if(entities?.length)
                newState[prop] = 
                    _addOrUpdateRange(<ImmutableArray<UnknownState>> newState[prop] || stateSlice, entities, propCfg.identifier); 
        }

        for(const prop in action.response.values){
            if(!action.syncStateConfig[prop]) console.error(`No sync state config for property ${prop}`);
            const value = action.response.values[prop];
            if(value) newState[prop] = value;
        }

        return newState;
    } 
)