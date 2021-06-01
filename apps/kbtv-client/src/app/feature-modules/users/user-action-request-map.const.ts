import { GenericActionRequestMap } from "@core/configurations/optimistic/generic-action-request-map.const";
import { CreateUserRequest, UpdateModelRequest } from "@core/configurations/model/model-requests.interface";
import { Model, User } from "@core/models";
import { ModelState } from "@core/state/model-state.interface";
import { DeleteModelAction, ModelCommand, SetSaveModelStateAction } from "model/state-commands";
import { ActionRequestMap } from "optimistic-http";
import { CurrentUser } from "state-auth";
import { SetSaveUserStateAction } from "./state/actions.const";
import { _idGenerator } from "@shared-app/helpers/id/id-generator.helper";

export const UserActionRequestMap : ActionRequestMap<SetSaveUserStateAction | DeleteModelAction<ModelState, Model>> = {
    [SetSaveUserStateAction] : (action) => {
        const genericSave = GenericActionRequestMap[SetSaveModelStateAction];

        const request = <CreateUserRequest | UpdateModelRequest<User & CurrentUser>> 
            genericSave({...action, type: SetSaveModelStateAction});

        if(action.saveAction === ModelCommand.Create){
            let {employer, ...rest} = action.saveModelResult.fullModel
            request.body = {...rest, password: action.password};
        }

        request.headers = { commandId: _idGenerator(4) }
        
        return request;
    },
    [DeleteModelAction]: GenericActionRequestMap[DeleteModelAction]
}