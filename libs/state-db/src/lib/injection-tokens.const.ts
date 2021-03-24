import { InjectionToken } from '@angular/core';
import { StateDbConfig } from './interfaces';

export const STATE_DB_CONFIG = new InjectionToken<StateDbConfig<unknown>>('STATE_DB_CONFIG');

