import { AuthGuard } from "state-auth";
import { AppRoute } from "../app-routing.module";
import { MainNavMobileComponent } from "../layout/main-nav/main-nav-mobile.component";
import { FeatureRoutes, LoginRoute, PageNotFoundRoute } from "./common.routes";

export const MobileRoutes : AppRoute[] = [
    {
        path: '', component: MainNavMobileComponent, canActivateChild: [AuthGuard],
        children: FeatureRoutes 
    },
    LoginRoute,
    PageNotFoundRoute
]