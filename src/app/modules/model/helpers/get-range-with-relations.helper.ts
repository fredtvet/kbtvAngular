import { ModelStateConfig } from '../model-state.config';
import { ModelConfig, UnknownModelState } from '../interfaces';
import { GetWithRelationsConfig } from '../get-with-relations.config';
import { _convertArrayToObject } from '@array/convert-array-to-object.helper';
import { _filter } from '@array/filter.helper';
import { _groupBy } from '@array/group-by.helper';
import { Immutable, ImmutableArray, Maybe, UnknownState } from '@global/interfaces';

export function _getRangeWithRelations<TModel extends {}, TState>(
    state: Immutable<Partial<TState>>,
    cfg: GetWithRelationsConfig<TState>,
    filter?: (value: Immutable<TModel>, index?: number, Array?: unknown[]) => boolean, 
): Immutable<TModel>[] {
    const modelCfg = ModelStateConfig.get<UnknownState, UnknownState>(cfg.modelProp); 

    let modelState = [...(<Immutable<UnknownModelState>> state)[cfg.modelProp] || []];
    
    if(filter)
        modelState = _filter(modelState, filter);

    if(!modelState.length) return <Immutable<TModel>[]> modelState;

    const hasChildren = cfg.includedChildProps && cfg.includedChildProps.length > 0;      
    const hasForeigns = cfg.includedForeignProps && cfg.includedForeignProps.length > 0;

    let foreignLookups = {};
    if(hasForeigns)
        foreignLookups = _createStatePropertyLookups(cfg.includedForeignProps, <UnknownState>state); 

    let childLookups = {};
    if(hasChildren) 
        childLookups = _createGroupedLookups(cfg.includedChildProps, modelCfg.foreignKey, <UnknownState>state) 

    
    if(hasForeigns || hasChildren){
        const newState: unknown[] = [];
        for(var i = 0; i < modelState.length; i++){
            let entityClone = {...<UnknownState>modelState[i]};                   
            _mapForeignsToEntity(cfg.includedForeignProps, foreignLookups, entityClone);        
            _mapChildrenToEntity(cfg.includedChildProps, modelCfg, childLookups, entityClone);
            newState[i] = entityClone;
        }
        return <Immutable<TModel>[]> newState
    }
    return <Immutable<TModel>[]> modelState;
    
}

//Lookup of children grouped by foreign key
function _createGroupedLookups(
    props: ImmutableArray<string>, 
    groupBy: Maybe<string>, 
    state: Immutable<UnknownState>
): {[key: string]: {[key: string]: unknown[]}}{
    const lookups = {} as {[key: string]: {[key: string]: unknown[]}}
    if(!groupBy) return lookups;
    for(const prop of props) lookups[prop] = _groupBy(<[]> state[prop], groupBy);
        
    return lookups;
}

//Lookup of foreign entities by identifier
function _createStatePropertyLookups(
    props: ImmutableArray<string>, 
    state: Immutable<UnknownState>
): {[key: string]: unknown}{
    const lookups: {[key: string]: Immutable<unknown>} = {};
    for(const prop of props){ //Convert foreign state props to lookup tables
        const cfg = ModelStateConfig.get(prop); 
        lookups[prop] = _convertArrayToObject(<[]> state[prop], cfg.identifier);
    }
    return lookups;
}

function _mapForeignsToEntity(
    props: ImmutableArray<string>, 
    lookups: {[key: string]: Immutable<UnknownState>}, 
    entity: UnknownState
  ): void{
    for(const foreignProp of props){ //Map foreign entity to entity
        const foreignCfg = ModelStateConfig.get(foreignProp);
        if(!foreignCfg.foreignProp || !foreignCfg.foreignKey) continue;
        entity[foreignCfg.foreignProp] = lookups[foreignProp][<string> entity[foreignCfg.foreignKey]]
    }
}

function _mapChildrenToEntity(
    props: ImmutableArray<string>, 
    propCfg: Immutable<ModelConfig<UnknownState, UnknownState>>, 
    lookups: {[key: string]: Readonly<UnknownState>}, 
    entity: UnknownState
): void{
    for(let childProp of props){
        const entityId = entity[propCfg.identifier];
        entity[childProp] = lookups[childProp][<string> entityId]
    }
}