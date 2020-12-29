import { Provider } from "@angular/core";
import { STORE_EFFECTS, STORE_REDUCERS } from "state-management";
import { SaveModelHttpEffect } from "./save-model.http.effect";
import { SaveModelReducer } from "./save-model.reducer";

export const SaveModelProviders: Provider[] = [
    {provide: STORE_EFFECTS, useClass: SaveModelHttpEffect, multi: true},
    {provide: STORE_REDUCERS, useValue: SaveModelReducer, multi: true},
]
