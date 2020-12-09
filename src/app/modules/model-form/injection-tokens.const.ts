import { InjectionToken } from '@angular/core';
import { ModelFormToSaveStateCommandAdapter } from './interfaces';

export const DEFAULT_SAVE_ADAPTER = 
    new InjectionToken<ModelFormToSaveStateCommandAdapter<any, any>>("DefaultSaveAdapter")