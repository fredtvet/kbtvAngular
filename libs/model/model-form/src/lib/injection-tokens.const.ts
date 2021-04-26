import { InjectionToken } from '@angular/core';
import { KeyVal } from 'global-types';

/** Used to inject translations for state & model properties used with the form. */
export const MODEL_FORM_PROP_TRANSLATIONS = new InjectionToken<KeyVal<string>>('ModelPropTranslations')