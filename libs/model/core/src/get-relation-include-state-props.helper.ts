import { Immutable, Prop } from "global-types";
import { ModelConfig, RelationInclude, StateModels } from "./interfaces";
import { _getModelConfig } from "./model-state-config-helpers";

function _getRelationStateProps(
    include: Immutable<RelationInclude<any, any>>,
    cfg: Immutable<ModelConfig<any, any>>,
    relation: "foreigns" | "children"
): string[] {
    let stateProps: string[] = [];

    if(!include[relation]) return stateProps; 
  
    if(include[relation] === "all") 
        for(const prop in cfg[relation]) stateProps.push(cfg[relation][prop].stateProp)
    else {
        for(const prop of include[relation]!){
            const rel = cfg[relation][<string> prop]
            if(rel) stateProps.push(rel.stateProp)
        }
    }
    
    return stateProps;
}

export function _getRelationIncludeStateProps<TState, TModel extends StateModels<TState>>(
    include: Immutable<RelationInclude<TState, TModel>>
): Prop<TState>[] {
    const cfg = _getModelConfig<TState, TModel>(include.prop);
    let stateProps: string[] = [<string> include.prop];

    stateProps = stateProps.concat(_getRelationStateProps(include, cfg, "foreigns"))
    stateProps = stateProps.concat(_getRelationStateProps(include, cfg, "children"))

    return <Prop<TState>[]> stateProps;
}


