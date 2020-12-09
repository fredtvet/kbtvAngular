import { ModelStateCommand } from '../../interfaces';

export const DeleteModelActionId = "DELETE_MODEL";

export interface DeleteModelStateCommand<TState> extends ModelStateCommand<TState>{
    id?: any;
    ids?: any[];
}