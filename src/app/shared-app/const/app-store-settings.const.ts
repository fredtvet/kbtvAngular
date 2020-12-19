import { StoreSettings } from "@state/interfaces";
import { environment } from "src/environments/environment";

export const AppStoreSettings: Partial<StoreSettings> = {
    strictImmutability: !environment.production
}