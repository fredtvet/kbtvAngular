import { Provider } from "@angular/core";
import { STORE_REDUCERS, STORE_EFFECTS, STORE_ACTION_INTERCEPTORS } from "state-management";
import { CreateMissionImagesHttpEffect } from "./create-mission-images.http.effect";
import { CreateMissionImagesReducer } from "./create-mission-images.reducer";
import { CreateMissionImagesValidatorInterceptor } from "./create-mission-images.validator";

export const CreateMissionImagesProviders: Provider[] = [
    { provide: STORE_REDUCERS, useValue: CreateMissionImagesReducer, multi: true},
    { provide: STORE_EFFECTS, useClass: CreateMissionImagesHttpEffect, multi: true},
    { provide: STORE_ACTION_INTERCEPTORS, useClass: CreateMissionImagesValidatorInterceptor, multi: true},
  ]