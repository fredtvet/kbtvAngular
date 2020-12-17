import { InjectionToken } from '@angular/core';
import { StateAction } from '@state/state.action';
import { FormToSaveModelConverter } from './interfaces';

export const DEFAULT_SAVE_CONVERTER = 
    new InjectionToken<FormToSaveModelConverter<{}, {}, StateAction>>("DefaultSaveConverter")