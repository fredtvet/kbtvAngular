import { Prop } from 'global-types';
import { ModelStateAction } from '../model-state.action';

export const MailModelsAction = "MAIL_MODELS_ACTION";
export interface MailModelsAction<TState> extends ModelStateAction<TState> {
    stateProp: Prop<TState>,
    ids: unknown[],
    toEmail: string
}