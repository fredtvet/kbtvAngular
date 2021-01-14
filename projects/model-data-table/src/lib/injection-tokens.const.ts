import { InjectionToken } from "@angular/core";
import { ModelDataTablesConfig, ModelNameTranslations } from "./interfaces";

export const MODEL_DATA_TABLES_CONFIG = new InjectionToken<ModelDataTablesConfig<unknown>>("ModelDataTablesConfig")

export const MODEL_NAME_TRANSLATIONS = new InjectionToken<ModelNameTranslations>("ModelNameTranslations")