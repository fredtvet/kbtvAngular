import { InjectionToken } from '@angular/core';
import { Prop } from 'global-types';
import { ActionRequestMap } from './interfaces';

export const ROOT_OPTIMISTIC_STATE_PROPS = new InjectionToken<Prop<unknown>[]>('RootOptimisticStateProps');
export const BASE_API_URL = new InjectionToken<string>('BaseApiUrl');
export const ACTION_REQUEST_MAP = new InjectionToken<ActionRequestMap<string>>('ModelCommandApiMap');
