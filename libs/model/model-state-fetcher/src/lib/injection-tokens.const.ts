import { InjectionToken } from "@angular/core";

/** Used to inject a base url appended to all fetch requests */
export const MODEL_FETCHER_BASE_URL = new InjectionToken<string>("ModelFetcherBaseUrl")