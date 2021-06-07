import { InjectionToken } from '@angular/core';
import { DbActionFilter, StateDbConfig } from './interfaces';

export const STATE_DB_CONFIG = new InjectionToken<StateDbConfig<unknown>>('STATE_DB_CONFIG');
export const STATE_DB_ACTION_FILTER = new InjectionToken<DbActionFilter>('STATE_DB_ACTION_FILTER');


