import { ImmutableArray, UnknownState } from "@global/interfaces";
import { RelationInclude } from "@model/interfaces";
import { ModelStateConfig } from "@model/model-state.config";
import { Prop } from "@state/interfaces";

export function _getRelationProps<TState>(
    cfg: RelationInclude<TState>
): {children: ImmutableArray<Prop<TState>>, foreigns: ImmutableArray<Prop<TState>>} {
    const modelCfg = ModelStateConfig.get<UnknownState, TState>(cfg.prop); 
    return {
        foreigns: (cfg.foreigns === "all" ? modelCfg.foreigns : cfg.foreigns) || [],
        children: (cfg.children === "all" ? modelCfg.children?.map(x => x.prop) : cfg.children) || []
    }
}