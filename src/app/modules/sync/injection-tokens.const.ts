import { InjectionToken } from '@angular/core';
import { SyncHttpFetcher, SyncStateConfig } from './interfaces';

export const SYNC_HTTP_FETCHER = new InjectionToken<SyncHttpFetcher<unknown>>('SyncHttpFetcher');
export const SYNC_STATE_CONFIG = new InjectionToken<SyncStateConfig<unknown>>('SyncStateConfig');
