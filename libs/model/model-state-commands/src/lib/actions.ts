import { Prop } from "global-types";
import { SaveModelResult, StateModels, StatePropByModel } from "model/core";
import { StateAction } from "state-management";
import { SaveAction } from "./interfaces";

export const DeleteModelAction = "DELETE_MODEL_ACTION";
export interface DeleteModelAction<TState, TModel extends StateModels<TState>> 
    extends ModelStateAction<TState, TModel, typeof DeleteModelAction>{

    payload: {id?: string | number, ids?: string[] | number[]}
}

export const SaveModelAction = "SAVE_MODEL_ACTION";
export interface SaveModelAction<TState, TModel extends StateModels<TState>> 
    extends ModelStateAction<TState, TModel, typeof SaveModelAction>{
    saveAction: SaveAction
    entity: TModel,
}

export const SetSaveModelStateAction = "SET_SAVE_MODEL_STATE_ACTION";
export interface SetSaveModelStateAction<TState, TModel extends StateModels<TState>> 
    extends ModelStateAction<TState, TModel, typeof SetSaveModelStateAction>{
    saveAction: SaveAction  
    saveModelResult: SaveModelResult<TState, TModel>
}

export interface ModelStateAction<TState, TModel extends StateModels<TState>, TType extends string> extends StateAction<TType>{
    stateProp: StatePropByModel<TState, TModel>;
}