import { ModelStateCommand } from '../interfaces/model-state-command.interface';

export const DeleteModelAction = "DELETE_MODEL";

export interface DeleteModelStateCommand extends ModelStateCommand{
    id?: any;
    ids?: any[];
    action: string;
}