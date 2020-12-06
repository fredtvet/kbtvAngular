import { ModelStateConfig } from 'src/app/model/model-state.config';
import { _addOrUpdateRange } from 'src/app/shared-app/helpers/array/add-or-update-range.helper';
import { _removeRangeByIdentifier } from 'src/app/shared-app/helpers/array/remove-range-by-identifier.helper';
import { Reducer } from 'src/app/state/interfaces';
import { StoreState } from '../interfaces';
import { SyncStateConfig } from '../../../../shared-app/const/sync-state.config';
import { SyncStateSuccessAction, SyncStateSuccessActionId } from './actions.const';

export const SetSyncResponseReducer: Reducer<any> = {
    actionId: SyncStateSuccessActionId, noDeepCloneAction: true, noDeepCloneState: true,
    stateProperties: Object.keys(SyncStateConfig),
    // stateProperties: (action: SyncStateSuccessAction) => Object.keys(action.response), //Krever samme navn på response & state props
    // stateProperties: , //bruk action && set sync states + evnt statiske sjekk dfuncjonene
    reducerFn: (unclonedState: StoreState, action: SyncStateSuccessAction): any => {
        const state = {...unclonedState, syncTimestamps: {}};
        for(const prop in SyncStateConfig){

            const propCfg = SyncStateConfig[prop];
            const propResponse = action.response[propCfg.responseKey];

            if(!propResponse) continue;

            state.syncTimestamps[prop] = propResponse.timestamp; //Update given timestamp

            if(propCfg.singular && propResponse.entities?.length) {
                state[prop] = propResponse.entities[0];
                continue;
            }

            const id = ModelStateConfig.get(prop as any)?.identifier;

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