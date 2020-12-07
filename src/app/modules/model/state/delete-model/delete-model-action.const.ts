import { ModelStateCommand } from '../interfaces/model-state-command.interface';

export const DeleteModelActionId = "DELETE_MODEL";

export interface DeleteModelStateCommand extends ModelStateCommand{
    id?: any;
    ids?: any[];
}