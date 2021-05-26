import { ModelFile } from "@core/models";
import { ModelState } from "@core/state/model-state.interface";
import { SaveModelAction, SetSaveModelStateAction } from "model/state-commands";
import { StateAction } from "state-management";

export const SaveModelFileAction = SaveModelAction+"_FILE";
export interface SaveModelFileAction<TModel extends ModelFile = ModelFile> extends Omit<SaveModelAction<ModelState, TModel>, "type">{
        file: File, 
        type: typeof SaveModelFileAction
}

export const SetSaveModelFileStateAction = "SET_SAVE_MODEL_FILE_STATE_ACTION";
export interface SetSaveModelFileStateAction<TModel extends ModelFile = ModelFile> extends Omit<SetSaveModelStateAction<ModelState, TModel>, "type">{
        file: File, 
        type: typeof SetSaveModelFileStateAction
}

export const WipeStateAction = "WIPE_STATE_ACTION";
export interface WipeStateAction extends StateAction<typeof WipeStateAction> { defaultState: {} }
