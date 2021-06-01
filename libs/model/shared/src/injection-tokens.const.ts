import { InjectionToken } from '@angular/core';
import { KeyVal } from 'global-types';

/** Used to inject translations for state & model properties. */
export const MODEL_PROP_TRANSLATIONS = new InjectionToken<KeyVal<string>>('ModelPropTranslations')