import { MissionDocument, MissionImage } from '@core/models';
import { ModelStateAction } from 'model/state-commands';
import { ModelState } from '../model-state.interface';

export const MailModelsAction = "MAIL_MODELS_ACTION";
export interface MailModelsAction<TModel extends MissionDocument | MissionImage> 
    extends ModelStateAction<ModelState, TModel, typeof MailModelsAction> {
    ids: unknown[],
    toEmail: string
}