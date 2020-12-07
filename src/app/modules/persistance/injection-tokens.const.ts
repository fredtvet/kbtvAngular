import { InjectionToken } from '@angular/core';

export const PERSISTED_STATE_PROPS = new InjectionToken<string[]>('PersistedStateProps');
export const PERSISTED_CRITICAL_STATE_PROPS = new InjectionToken<string[]>('PersistedCriticalStateProps');
