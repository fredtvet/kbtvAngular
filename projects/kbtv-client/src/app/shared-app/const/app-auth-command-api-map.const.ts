import { ApiUrl } from "@core/api-url.enum";
import { environment } from "src/environments/environment";
import { AuthCommandApiMap, LoginAction, LogoutAction, RefreshTokenAction } from "state-auth";

export const AppAuthCommandApiMap: AuthCommandApiMap = {
    [RefreshTokenAction]: { method: "POST", apiUrl: environment.apiUrl + ApiUrl.Auth + '/refresh' },
    [LoginAction]: { method: "POST", apiUrl: environment.apiUrl + ApiUrl.Auth + '/login' },
    [LogoutAction]: { method: "POST", apiUrl: environment.apiUrl + ApiUrl.Auth + '/logout' }
}