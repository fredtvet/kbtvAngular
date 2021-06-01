import { Immutable } from "global-types";
import { StateModels } from "model/core";
import { SaveModelAction } from "model/state-commands";
import { ModelFormResult } from "./interfaces";

export function _formToSaveModelConverter<TState extends object, TModel extends StateModels<TState>>(
    input: Immutable<ModelFormResult<TState, TModel>>
): Immutable<SaveModelAction<TState, TModel>> {
    return {
        type: SaveModelAction,
        saveAction: input.saveAction,
        entity: input.formValue,
        stateProp: input.stateProp
    }
}