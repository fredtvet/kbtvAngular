import { Provider } from "@angular/core";
import { STORE_EFFECTS } from "state-management";
import { MailModelsHttpEffect } from "./mail-models.http.effect";

export const MailModelsProviders: Provider[] = [
    {provide: STORE_EFFECTS, useClass: MailModelsHttpEffect, multi: true},
]