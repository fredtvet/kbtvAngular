import { Route } from "@angular/router";

export interface CustomRoute<TData> extends Route {
    data?: TData;
    children?: CustomRoute<TData>[]
}