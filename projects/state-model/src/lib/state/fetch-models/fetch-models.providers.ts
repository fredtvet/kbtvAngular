import { Provider } from "@angular/core";
import { STORE_EFFECTS, STORE_REDUCERS } from "state-management";
import { FetchModelsHttpEffect } from "./fetch-models.http.effect";
import { SetFetchedModelReducer } from "./set-fetched-model.reducer";

export const FetchModelsProviders: Provider[] = [
    {provide: STORE_EFFECTS, useClass: FetchModelsHttpEffect, multi: true},
    {provide: STORE_REDUCERS, useValue: SetFetchedModelReducer, multi: true},
]