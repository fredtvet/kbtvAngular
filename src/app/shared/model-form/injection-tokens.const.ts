import { InjectionToken } from '@angular/core';
import { ModelFormToSaveStateCommandAdapter } from './interfaces/model-form-to-state-command-adapter.interface';

export const DEFAULT_SAVE_ADAPTER = 
    new InjectionToken<ModelFormToSaveStateCommandAdapter<any, any>>("DefaultSaveAdapter")