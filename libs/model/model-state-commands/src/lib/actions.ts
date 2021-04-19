import { Prop } from "global-types";
import { StateAction } from "state-management";
import { SaveAction } from "./interfaces";

export const DeleteModelAction = "DELETE_MODEL_ACTION";
export interface DeleteModelAction<TState> extends ModelStateAction<TState, typeof DeleteModelAction>{
    payload: {id?: unknown, ids?: unknown[]}
}


export const SaveModelAction = "SAVE_MODEL_ACTION";
export interface SaveModelAction<TModel, TState> extends ModelStateAction<TState, typeof SaveModelAction>{
    entity: TModel,
    saveAction: SaveAction
}

export interface ModelStateAction<TState, TType extends string> extends StateAction{
    stateProp: Prop<TState>;
    type: TType;
}