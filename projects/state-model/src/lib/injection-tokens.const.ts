import { InjectionToken } from '@angular/core';
import { CommandApiMap, ModelConfig } from './interfaces';
import { KeyVal } from 'global-types';

export const MODEL_CONFIGS = new InjectionToken<ModelConfig<unknown, unknown>[]>('ModelConfigs');

export const COMMAND_API_MAP = new InjectionToken<CommandApiMap>('CommandApiMap');

export const MODEL_PROP_TRANSLATIONS = new InjectionToken<KeyVal<string>>('ModelPropTranslations');