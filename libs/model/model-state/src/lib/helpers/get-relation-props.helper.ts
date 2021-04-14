import { ImmutableArray, UnknownState, Prop } from "global-types";
import { RelationInclude } from "../interfaces";
import { ModelStateConfig } from "../model-state.config";

/**
 * Get state properties of relationships specified in input config. 
 * @param cfg 
 */
export function _getRelationProps<TState>(
    cfg: RelationInclude<TState>
): {children: ImmutableArray<Prop<TState>>, foreigns: ImmutableArray<Prop<TState>>} {
    const modelCfg = ModelStateConfig.get<UnknownState, TState>(cfg.prop); 
    return {
        foreigns: (cfg.foreigns === "all" ? modelCfg.foreigns : cfg.foreigns) || [],
        children: (cfg.children === "all" ? modelCfg.children?.map(x => x.prop) : cfg.children) || []
    }
}