import { InjectionToken } from '@angular/core';
import { KeyVal } from 'global-types';
import { StateAction } from 'state-management'
import { FormToSaveModelConverter } from './interfaces';

export const DEFAULT_SAVE_CONVERTER = 
    new InjectionToken<FormToSaveModelConverter<{}, {}, StateAction>>("DefaultSaveConverter");
    
/** Used to inject translations for state & model properties used with the form. */
export const MODEL_FORM_PROP_TRANSLATIONS = new InjectionToken<KeyVal<string>>('ModelPropTranslations')