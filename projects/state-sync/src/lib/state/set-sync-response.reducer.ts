import { _addOrUpdateRange, _removeRangeByIdentifier } from 'array-helpers';
import { Immutable, ImmutableArray, UnknownState } from 'global-types';
import { Reducer, _createReducer } from 'state-management';
import { SyncStatePropConfig } from '../interfaces';
import { StoreState } from "../store-state.interface";
import { SyncStateSuccessAction } from './actions';

export const SetSyncResponseReducer: Reducer<Immutable<StoreState>,SyncStateSuccessAction> = _createReducer(
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