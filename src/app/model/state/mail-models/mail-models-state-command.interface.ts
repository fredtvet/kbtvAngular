import { ModelStateCommand } from '../interfaces/model-state-command.interface';

export const MailModelsActionId = "MAIL_MODELS"

export interface MailModelsStateCommand extends ModelStateCommand {
    ids: any[];
    toEmail: string;
}