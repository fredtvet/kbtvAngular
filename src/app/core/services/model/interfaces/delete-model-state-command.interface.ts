import { ModelStateCommand } from './model-state-command.interface';

export interface DeleteModelStateCommand extends ModelStateCommand{
    id?: any;
    ids?: any[];
}