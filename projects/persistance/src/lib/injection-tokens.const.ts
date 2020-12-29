import { InjectionToken } from '@angular/core';
import { PersistanceConfig } from './interfaces';

export const PERSISTANCE_CONFIG = new InjectionToken<PersistanceConfig<unknown>>('PERSISTANCE_CONFIG');

