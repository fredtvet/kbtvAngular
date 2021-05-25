import { SetSaveUserStateAction } from "@actions/user-actions";
import { GenericActionRequestMap } from "@core/configurations/optimistic/generic-action-request-map.const";
import { Model } from "@core/models";
import { ModelState } from "@core/state/model-state.interface";
import { DeleteModelAction, ModelCommand, SetSaveModelStateAction } from "model/state-commands";
import { ActionRequestMap } from "optimistic-http";

export const UserActionRequestMap : ActionRequestMap<SetSaveUserStateAction | DeleteModelAction<ModelState, Model>> = {
    [SetSaveUserStateAction] : (action) => {
        const genericSave = GenericActionRequestMap[SetSaveModelStateAction];
        const request = genericSave({...action, type: SetSaveModelStateAction});
        if(action.saveAction === ModelCommand.Create){
            let {employer, ...rest} = action.saveModelResult.fullModel
            request.body = {...rest, password: action.password};
        }
        return request;
    },
    [DeleteModelAction]: GenericActionRequestMap[DeleteModelAction]
}