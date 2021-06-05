import { AuthGuard } from "state-auth";
import { AppRoute } from "../app-routing.module";
import { MainNavDesktopComponent } from "../layout/main-nav/main-nav-desktop.component";
import { FeatureRoutes, LoginRoute, PageNotFoundRoute } from "./common.routes";

export const DesktopRoutes : AppRoute[] = [
    {
        path: '', component: MainNavDesktopComponent, canActivateChild: [AuthGuard],
        children: FeatureRoutes 
    },
    LoginRoute,
    PageNotFoundRoute
]