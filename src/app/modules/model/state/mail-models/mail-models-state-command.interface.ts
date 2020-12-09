import { ModelStateCommand } from '../../interfaces';

export const MailModelsActionId = "MAIL_MODELS"

export interface MailModelsStateCommand<TState> extends ModelStateCommand<TState> {
    ids: any[];
    toEmail: string;
}