import { ModelFile } from "@core/models";
import { ModelState } from "@core/state/model-state.interface";
import { ModelFileWrapper } from "@shared/model-file.wrapper";
import { Prop } from "global-types";
import { StateAction } from "state-management";
import { SaveAction, SaveModelAction } from "model-state";

export const SaveModelFileAction = SaveModelAction+"_FILE";
export interface SaveModelFileAction<TModel extends ModelFile = ModelFile> extends SaveModelAction<TModel, ModelState>{
        stateProp: Prop<ModelState>,
        entity: TModel,
        fileWrapper: ModelFileWrapper,
        saveAction: SaveAction,  
        apiUrlOverride?: string,   
}

export const WipeStateAction = "WIPE_STATE_ACTION";
export interface WipeStateAction extends StateAction { defaultState: {} }
