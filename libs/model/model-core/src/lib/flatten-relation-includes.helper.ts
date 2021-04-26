import { Immutable } from "global-types";
import { RelationInclude } from "./interfaces";
import { _getModelConfig } from "./model-state-config-helpers";

export function _flattenRelationIncludes<T>(includes: Immutable<RelationInclude<T>>): string[] {
    const modelConfig = _getModelConfig(includes.prop);
    return [
        includes.prop, 

        ...(!includes.foreigns ? [] : 
            includes.foreigns === "all" ? (modelConfig.foreigns || []) : 
            includes.foreigns), 

        ...(!includes.children ? [] : 
            includes.children === "all" ? (modelConfig.children?.map(x => x.prop) || []) : 
            includes.children),
    ]
}