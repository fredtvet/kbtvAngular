
import { SaveModelReducer } from '@model/state/save-model/save-model.reducer';
import { Reducer } from '@state/interfaces';
import { SaveUserActionId, SaveUserStateCommand } from './save-user-state-command.interface';

export const SaveUserReducer: Reducer<any, SaveUserStateCommand> = {  
    ...SaveModelReducer,
    actionId: SaveUserActionId
}