import { UpdateCurrentUserAction } from "@actions/profile-actions";
import { ApiUrl } from "@core/api-url.enum";
import { Immutable } from "global-types";
import { ActionRequestMap } from "optimistic-http";

export const ProfileActionRequestMap: ActionRequestMap<typeof UpdateCurrentUserAction> = {
    [UpdateCurrentUserAction]: (a: Immutable<UpdateCurrentUserAction>) => {
        return { method: "PUT", body: a.user, apiUrl: ApiUrl.Auth }
    }
}