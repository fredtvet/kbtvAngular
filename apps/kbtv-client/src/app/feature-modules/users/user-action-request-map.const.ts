import { SaveUserAction } from "@actions/user-actions";
import { GenericActionRequestMap } from "@core/configurations/optimistic/generic-action-request-map.const";
import { DeleteModelAction, ModelCommand, SaveModelAction } from "model/state-commands";
import { ActionRequestMap } from "optimistic-http";

export const UserActionRequestMap : ActionRequestMap<typeof SaveUserAction | typeof DeleteModelAction> = {
    [SaveUserAction] : (action: SaveUserAction) => {
        const genericSave = GenericActionRequestMap[SaveModelAction];
        const request = genericSave(action);
        if(action.saveAction === ModelCommand.Create){
            let {employer, ...rest} = action.entity
            request.body = {...rest, password: action.password};
        }
        return request;
    },
    [DeleteModelAction]: GenericActionRequestMap[DeleteModelAction]
}