import { Prop } from 'global-types';
import { ModelStateAction } from 'model/state-commands';

export const MailModelsAction = "MAIL_MODELS_ACTION";
export interface MailModelsAction<TState> extends ModelStateAction<TState, typeof MailModelsAction> {
    stateProp: Prop<TState>,
    ids: unknown[],
    toEmail: string
}