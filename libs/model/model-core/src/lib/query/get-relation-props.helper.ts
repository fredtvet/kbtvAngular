import { Immutable, ImmutableArray, Prop } from "global-types";
import { ModelConfig, RelationInclude } from "../interfaces";
import { _getModelConfig } from "../model-state-config-helpers";

/**
 * Get state properties of relationships specified in input config. 
 * @param cfg 
 */
export function _getRelationProps<TState>(
    cfg: Immutable<RelationInclude<TState>>
): {children: ImmutableArray<Prop<TState>>, foreigns: ImmutableArray<Prop<TState>>} {
    const modelCfg = _getModelConfig<ModelConfig<unknown, TState>>(cfg.prop); 
    return {
        foreigns: (cfg.foreigns === "all" ? modelCfg.foreigns : cfg.foreigns) || [],
        children: (cfg.children === "all" ? modelCfg.children?.map(x => x.prop) : cfg.children) || []
    }
}