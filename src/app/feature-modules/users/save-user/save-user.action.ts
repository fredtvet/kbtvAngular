import { User } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { SaveModelAction } from '@model/state/save-model/save-model.action';

export const SaveUserAction = SaveModelAction+"_USER";
export interface SaveUserAction extends SaveModelAction<User, ModelState>{
    password: string,
}