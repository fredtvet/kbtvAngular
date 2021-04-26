import { UnknownState } from "global-types";
import { SaveModelAction } from "model/state-commands";
import { ModelFormResult } from "./interfaces";

type Action<T> = SaveModelAction<T,T>
export function _formToSaveModelConverter(
    input: ModelFormResult<UnknownState, UnknownState>
): Action<UnknownState> {
    return {
        type: SaveModelAction,
        saveAction: input.saveAction,
        entity: input.formValue,
        stateProp: input.stateProp
    }
}