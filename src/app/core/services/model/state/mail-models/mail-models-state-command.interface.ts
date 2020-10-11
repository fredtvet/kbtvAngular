import { ModelStateCommand } from '../interfaces/model-state-command.interface';

export const MailModelsAction = "MAIL_MODELS"

export interface MailModelsStateCommand extends ModelStateCommand {
    ids: any[];
    toEmail: string;
}