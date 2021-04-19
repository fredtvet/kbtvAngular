import { Provider } from "@angular/core";
import { STORE_EFFECTS, STORE_REDUCERS } from "state-management";
import { FetchModelsHttpEffect } from "./state/fetch-models.http.effect";
import { SetFetchedModelReducer } from "./state/set-fetched-model.reducer";
import { SetFetchingModelStatusReducer } from "./state/set-fetching-model-status.reducer";

export const FetchModelProviders: Provider[] = [
    {provide: STORE_EFFECTS, useClass: FetchModelsHttpEffect, multi: true},
    {provide: STORE_REDUCERS, useValue: SetFetchedModelReducer, multi: true},
    {provide: STORE_REDUCERS, useValue: SetFetchingModelStatusReducer, multi: true},
]