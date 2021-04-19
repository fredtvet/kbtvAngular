import { _convertArrayToObject, _filter, _groupBy } from 'array-helpers';
import { Immutable, ImmutableArray, Maybe, UnknownState } from 'global-types';
import { ModelConfig, RelationInclude, UnknownModelState } from '../interfaces';
import { _getModelConfig } from '../model-state-config-helpers';
import { _getRelationProps } from './get-relation-props.helper';

/**
 * Get all or given range of models with specified relationships set on model
 * according to model property config {@link ModelConfig}
 * @param state State containing model and relationship data
 * @param cfg Configuration of which relationships to include
 * @param filter A filter to select a range of models. 
 * @returns An array of models with relationships applied. 
 */
export function _getRangeWithRelations<TModel extends {}, TState>(
    state: Immutable<Partial<TState>>,
    cfg: RelationInclude<TState>,
    filter?: (value: Immutable<TModel>, index?: number, Array?: unknown[]) => boolean, 
): Immutable<TModel>[] {
    const modelCfg = _getModelConfig(cfg.prop); 

    let modelState = [...(<Immutable<UnknownModelState>> state)[cfg.prop] || []];
    
    if(filter)
        modelState = _filter(modelState, filter);

    if(!modelState.length) return <Immutable<TModel>[]> modelState;

    const {foreigns, children} = _getRelationProps<TState>(cfg);

    let foreignLookups = {};
    if(foreigns.length)
        foreignLookups = _createStatePropertyLookups(foreigns, state); 

    let childLookups = {};
    if(children.length) 
        childLookups = _createGroupedLookups(children, modelCfg.foreignKey, state) 

    
    if(children.length || foreigns.length){
        const newState: unknown[] = [];
        for(var i = 0; i < modelState.length; i++){
            let entityClone = {...<UnknownState>modelState[i]};                   
            _mapForeignsToEntity(foreigns, foreignLookups, entityClone);        
            _mapChildrenToEntity(children, modelCfg, childLookups, entityClone);
            newState[i] = entityClone;
        }
        return <Immutable<TModel>[]> newState
    }
    return <Immutable<TModel>[]> modelState;
    
}

/** Lookup of children grouped by foreign key */
function _createGroupedLookups(
    props: ImmutableArray<string>, 
    groupBy: Maybe<string>, 
    state: Immutable<{}>
): {[key: string]: {[key: string]: unknown[]}}{
    const lookups = {} as {[key: string]: {[key: string]: unknown[]}}
    if(!groupBy) return lookups;
    for(const prop of props) lookups[prop] = _groupBy(<[]>(<UnknownState> state)[prop], groupBy);
        
    return lookups;
}

/** Lookup of foreign entities by idProp */
function _createStatePropertyLookups(
    props: ImmutableArray<string>, 
    state: Immutable<{}>
): {[key: string]: unknown}{
    const lookups: {[key: string]: Immutable<unknown>} = {};
    for(const prop of props){ //Convert foreign state props to lookup tables
        const cfg = _getModelConfig(prop); 
        lookups[prop] = _convertArrayToObject(<[]> (<UnknownState> state)[prop], cfg.idProp);
    }
    return lookups;
}

function _mapForeignsToEntity(
    props: ImmutableArray<string>, 
    lookups: {[key: string]: Immutable<UnknownState>}, 
    entity: UnknownState
  ): void{
    for(const foreignProp of props){ //Map foreign entity to entity
        const foreignCfg = _getModelConfig(foreignProp);
        if(!foreignCfg.foreignProp || !foreignCfg.foreignKey) continue;
        entity[foreignCfg.foreignProp] = lookups[foreignProp][<string> entity[foreignCfg.foreignKey]]
    }
}

function _mapChildrenToEntity<TState>(
    props: ImmutableArray<string>, 
    propCfg: Immutable<ModelConfig<UnknownState, TState>>, 
    lookups: {[key: string]: Immutable<UnknownState>}, 
    entity: UnknownState
): void{
    for(let childProp of props){
        const entityId = entity[propCfg.idProp];
        entity[childProp] = lookups[childProp][<string> entityId]
    }
}