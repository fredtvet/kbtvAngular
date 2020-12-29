import { InjectionToken } from '@angular/core';
import { OptimisticStateSelector } from './interfaces';

export const OPTIMISTIC_STATE_SELECTOR = new InjectionToken<OptimisticStateSelector<unknown>>('OptimisticStateSelector');
export const BASE_API_URL = new InjectionToken<string>('BaseApiUrl');