import { Provider } from "@angular/core";
import { STORE_EFFECTS } from "state-management";
import { CreateMissionImagesEffect } from "./create-mission-images.effect";

export const CreateMissionImagesProviders: Provider[] = [
    { provide: STORE_EFFECTS, useClass: CreateMissionImagesEffect, multi: true}
]