
import { SaveModelReducer } from 'src/app/model/state/save-model/save-model.reducer';
import { Reducer } from 'src/app/state/interfaces';
import { SaveUserActionId } from './save-user-state-command.interface';

export const SaveUserReducer: Reducer<any> = {  
    ...SaveModelReducer,
    actionId: SaveUserActionId
}