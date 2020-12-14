import { Prop } from '@state/interfaces';
import { ModelStateAction } from '../model-state.action';

export const DeleteModelAction = "DELETE_MODEL_ACTION";
export interface DeleteModelAction<TState> extends ModelStateAction<TState>{
    stateProp: Prop<TState>,
    payload: {id?: any, ids?: any[]}
}