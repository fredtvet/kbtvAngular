import { Provider } from "@angular/core";
import { STORE_EFFECTS, STORE_REDUCERS } from "state-management";
import { DeleteModelHttpEffect } from "./delete-model.http.effect";
import { DeleteModelReducer } from "./delete-model.reducer";

export const DeleteModelProviders: Provider[] = [
    {provide: STORE_EFFECTS, useClass: DeleteModelHttpEffect, multi: true},
    {provide: STORE_REDUCERS, useValue: DeleteModelReducer, multi: true},
]