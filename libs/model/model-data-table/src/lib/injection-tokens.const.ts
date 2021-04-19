import { InjectionToken } from "@angular/core";
import { KeyVal } from "global-types";
import { ModelDataTablesConfig } from "./interfaces";

export const MODEL_DATA_TABLES_CONFIG = new InjectionToken<ModelDataTablesConfig<unknown>>("ModelDataTablesConfig")

/** Used to inject translations for state & model properties used with the data table. */
export const MODEL_DATA_TABLE_PROP_TRANSLATIONS = new InjectionToken<KeyVal<string>>('ModelPropTranslations')