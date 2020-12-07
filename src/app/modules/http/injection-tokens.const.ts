import { InjectionToken } from '@angular/core';
import { OptimisticStateSelector } from './interfaces';

export const OPTIMISTIC_STATE_SELECTOR = new InjectionToken<OptimisticStateSelector<any>>('OptimisticStateSelector');
