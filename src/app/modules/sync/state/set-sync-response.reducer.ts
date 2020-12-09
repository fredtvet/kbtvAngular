import { _addOrUpdateRange } from '@array/add-or-update-range.helper';
import { _removeRangeByIdentifier } from '@array/remove-range-by-identifier.helper';
import { Reducer } from '@state/interfaces';
import { StoreState } from '../interfaces';
import { SyncStateSuccessAction, SyncStateSuccessActionId } from './actions.const';

export const SetSyncResponseReducer: Reducer<any> = {
    actionId: SyncStateSuccessActionId, noDeepCloneAction: true, noDeepCloneState: true,
    stateProperties: (action: SyncStateSuccessAction) => Object.keys(action.syncStateConfig),
    // stateProperties: (action: SyncStateSuccessAction) => Object.keys(action.response), //Krever samme navn på response & state props
    // stateProperties: , //bruk action && set sync states + evnt statiske sjekk dfuncjonene
    reducerFn: (unclonedState: StoreState, action: SyncStateSuccessAction): any => {
        const state = {...unclonedState, syncTimestamps: {}};
        for(const prop in action.syncStateConfig){

            const propCfg = action.syncStateConfig[prop] as any; //Replace with new logic
            const propResponse = action.response[propCfg.responseKey]; //Bruk prop etterhvert

            if(!propResponse) continue;

            state.syncTimestamps[prop] = propResponse.timestamp; //Update given timestamp

            if(propCfg.singular && propResponse.entities?.length) {
                state[prop] = propResponse.entities[0];
                continue;
            }

            const id = action.syncStateConfig[prop]?.identifier;

            if(propResponse.deletedEntities?.length)
                state[prop] = 
                    _removeRangeByIdentifier<any>(state[prop]?.slice(), propResponse.deletedEntities, id);

            if(propResponse.entities?.length)
                state[prop] = 
                    _addOrUpdateRange<any>(state[prop]?.slice(), propResponse.entities, id); 
        }

        return state;
    }
}