import { ApiUrl } from "@core/api-url.enum";
import { UpdateCurrentUserRequest } from "@core/configurations/model/model-requests.interface";
import { _idGenerator } from "@shared-app/helpers/id/id-generator.helper";
import { ActionRequestMap } from "optimistic-http";
import { UpdateCurrentUserAction } from "./state/actions.const";

export const ProfileActionRequestMap: ActionRequestMap<UpdateCurrentUserAction> = {
    [UpdateCurrentUserAction]: (a): UpdateCurrentUserRequest => {
        return { 
            method: "PUT", 
            body: a.user, 
            apiUrl: ApiUrl.Auth, 
            headers: { commandId: _idGenerator(4) },
            type: UpdateCurrentUserRequest
        }
    }
}