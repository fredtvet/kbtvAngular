import { ModelFile } from "@core/models";
import { ModelState } from "@core/state/model-state.interface";
import { ModelFileWrapper } from "@shared/model-file.wrapper";
import { Prop } from "global-types";
import { SaveAction, SaveModelAction } from "model/state-commands";
import { StateAction } from "state-management";

export const SaveModelFileAction = SaveModelAction+"_FILE";
export interface SaveModelFileAction<TModel extends ModelFile = ModelFile> extends Omit<SaveModelAction<TModel, ModelState>, "type">{
        stateProp: Prop<ModelState>,
        entity: TModel,
        fileWrapper: ModelFileWrapper,
        saveAction: SaveAction,  
        type: typeof SaveModelFileAction
}

export const WipeStateAction = "WIPE_STATE_ACTION";
export interface WipeStateAction extends StateAction { defaultState: {} }
