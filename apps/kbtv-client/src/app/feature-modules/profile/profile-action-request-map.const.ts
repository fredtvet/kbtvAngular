import { UpdateCurrentUserAction } from "@actions/profile-actions";
import { ApiUrl } from "@core/api-url.enum";
import { ActionRequestMap } from "optimistic-http";

export const ProfileActionRequestMap: ActionRequestMap<UpdateCurrentUserAction> = {
    [UpdateCurrentUserAction]: (a) => {
        return { method: "PUT", body: a.user, apiUrl: ApiUrl.Auth }
    }
}