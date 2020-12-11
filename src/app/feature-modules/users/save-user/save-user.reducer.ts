
import { SaveModelReducer } from '@model/state/save-model/save-model.reducer';
import { Reducer } from '@state/interfaces';
import { SaveUserAction } from './save-user.action';

export const SaveUserReducer: Reducer<any, SaveUserAction> = {  
    ...SaveModelReducer,
    action: SaveUserAction
}