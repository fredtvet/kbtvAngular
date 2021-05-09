import { SetSaveUserStateAction } from "@actions/user-actions";
import { GenericActionRequestMap } from "@core/configurations/optimistic/generic-action-request-map.const";
import { DeleteModelAction, ModelCommand, SetSaveModelStateAction } from "model/state-commands";
import { ActionRequestMap } from "optimistic-http";

export const UserActionRequestMap : ActionRequestMap<typeof SetSaveUserStateAction | typeof DeleteModelAction> = {
    [SetSaveUserStateAction] : (action: SetSaveUserStateAction) => {
        const genericSave = GenericActionRequestMap[SetSaveModelStateAction];
        const request = genericSave(action);
        if(action.saveAction === ModelCommand.Create){
            let {employer, ...rest} = action.saveModelResult.fullModel
            request.body = {...rest, password: action.password};
        }
        return request;
    },
    [DeleteModelAction]: GenericActionRequestMap[DeleteModelAction]
}