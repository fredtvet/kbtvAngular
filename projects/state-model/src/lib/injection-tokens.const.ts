import { InjectionToken } from '@angular/core';
import { ModelCommandApiMap, ModelConfig } from './interfaces';
import { KeyVal } from 'global-types';

export const MODEL_CONFIGS = new InjectionToken<ModelConfig<unknown, unknown>[]>('ModelConfigs');

export const MODEL_COMMAND_API_MAP = new InjectionToken<ModelCommandApiMap>('ModelCommandApiMap');

/** Translations of all model properties  */
export const MODEL_PROP_TRANSLATIONS = new InjectionToken<KeyVal<string>>('ModelPropTranslations');