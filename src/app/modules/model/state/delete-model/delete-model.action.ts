import { ModelStateAction } from '../model-state.action';

export const DeleteModelAction = "DELETE_MODEL_ACTION";
export interface DeleteModelAction<TState> extends ModelStateAction<TState>{
    payload: {id?: unknown, ids?: unknown[]}
}