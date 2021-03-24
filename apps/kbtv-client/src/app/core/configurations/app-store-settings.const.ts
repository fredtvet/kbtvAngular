import { StoreSettings } from 'state-management'
import { environment } from "src/environments/environment";

export const AppStoreSettings: Partial<StoreSettings> = {
    strictImmutability: !environment.production,
    logStateChanges: !environment.production
}