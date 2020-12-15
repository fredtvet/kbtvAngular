import { ModelStateConfig } from '../model-state.config';
import { ModelConfig } from '../interfaces';
import { GetWithRelationsConfig } from '../get-with-relations.config';
import { _convertArrayToObject } from '@array/convert-array-to-object.helper';
import { _filter } from '@array/filter.helper';
import { _groupBy } from '@array/group-by.helper';
import { Immutable, ImmutableArray } from '@immutable/interfaces';

export function _getRangeWithRelations<TModel, TState>(
    state: Immutable<Partial<TState>>,
    cfg: GetWithRelationsConfig<TState>,
    filter?: (value: Immutable<TModel>, index?: number, Array?: unknown[]) => boolean, 
): ImmutableArray<TModel> {
    const modelCfg = ModelStateConfig.get<TModel, TState>(cfg.modelProp); 

    let modelState = <ImmutableArray<TModel>> state[cfg.modelProp as string];
    
    if(filter)
        modelState = _filter(modelState, filter);

    if(!modelState || modelState.length == 0) return modelState;

    const hasChildren = cfg.includedChildProps && cfg.includedChildProps.length > 0;      
    const hasForeigns = cfg.includedForeignProps && cfg.includedForeignProps.length > 0;

    let foreignLookups = {};
    if(hasForeigns)
        foreignLookups = _createStatePropertyLookups(cfg.includedForeignProps, state); 

    let childLookups = {};
    if(hasChildren) 
        childLookups = _createGroupedLookups(cfg.includedChildProps, modelCfg.foreignKey, state) 

    
    if(hasForeigns || hasChildren){
        const newState = [];
        for(var i = 0; i < modelState.length; i++){
            let entityClone = {...modelState[i]};                   
            _mapForeignsToEntity(cfg.includedForeignProps, foreignLookups, entityClone);        
            _mapChildrenToEntity(cfg.includedChildProps, modelCfg, childLookups, entityClone);
            newState[i] = entityClone;
        }
        return newState
    }
    return modelState;
    
}

//Lookup of children grouped by foreign key
function _createGroupedLookups(
    props: ImmutableArray<string>, 
    groupBy: string, state: Object
): {[key: string]: {[key: string]: Object[]}}{
    const lookups = {} as {[key: string]: {[key: string]: Object[]}}

    for(const prop of props) lookups[prop] = _groupBy(state[prop], groupBy);
        
    return lookups;
}

//Lookup of foreign entities by identifier
function _createStatePropertyLookups(
    props: ImmutableArray<string>, 
    state: Immutable<Object>
): {[key: string]: Object}{
    const lookups: {[key: string]: Immutable<Object>} = {};
    for(const prop of props){ //Convert foreign state props to lookup tables
        const cfg = ModelStateConfig.get(prop); 
        lookups[prop] = _convertArrayToObject(state[prop], cfg.identifier);
    }
    return lookups;
}

function _mapForeignsToEntity<T>(
    props: ImmutableArray<string>, 
    lookups: {[key: string]: Immutable<Object>}, 
    entity: Immutable<T>
  ): void{
    for(const foreignProp of props){ //Map foreign entity to entity
        const foreignCfg = ModelStateConfig.get(foreignProp);
        entity[foreignCfg.foreignProp] = lookups[foreignProp][entity[foreignCfg.foreignKey]]
    }
}

function _mapChildrenToEntity<T, TState>(
    props: ImmutableArray<string>, 
    propCfg: Immutable<ModelConfig<T, TState>>, 
    lookups: {[key: string]: Readonly<Object>}, 
    entity: Immutable<T>
): void{
    for(let childProp of props){
        const entityId = entity[propCfg.identifier as string];
        entity[childProp] = lookups[childProp][entityId]
    }
}