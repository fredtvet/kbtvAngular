import { ModelStateConfig } from '../model-state.config';
import { ModelConfig } from '../interfaces';
import { GetWithRelationsConfig } from '../get-with-relations.config';
import { _convertArrayToObject } from '@array/convert-array-to-object.helper';
import { _filter } from '@array/filter.helper';
import { _groupBy } from '@array/group-by.helper';

export function _getRangeWithRelations<TModel, TState>(
    state: Readonly<Partial<TState>>,
    cfg: GetWithRelationsConfig<TState>,
    filter?: (value: TModel, index?: number, Array?: any[]) => boolean, 
): TModel[] {
    const modelCfg = ModelStateConfig.get(cfg.modelProp); 

    let modelState = state[cfg.modelProp] as any;
    
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
        for(var i = 0; i < modelState.length; i++){
            let entity = modelState[i];                   
                _mapForeignsToEntity(cfg.includedForeignProps, foreignLookups, entity);        
                _mapChildrenToEntity(cfg.includedChildProps, modelCfg, childLookups, entity);
            modelState[i] = entity;
        }
    }
    return modelState
}

//Lookup of children grouped by foreign key
function _createGroupedLookups(
    props: string[], 
    groupBy: string, state: Object
): {[key: string]: {[key: string]: Object[]}}{
    const lookups = {} as {[key: string]: {[key: string]: Object[]}}

    for(const prop of props) lookups[prop] = _groupBy(state[prop], groupBy);
        
    return lookups;
}

//Lookup of foreign entities by identifier
function _createStatePropertyLookups(
    props: string[], 
    state: Readonly<Object>
): {[key: string]: Object}{
    const lookups: {[key: string]: Readonly<Object>} = {};
    for(const prop of props){ //Convert foreign state props to lookup tables
        const cfg = ModelStateConfig.get(prop); 
        lookups[prop] = _convertArrayToObject(state[prop], cfg.identifier);
    }
    return lookups;
}

function _mapForeignsToEntity<T>(
    props: string[], 
    lookups: {[key: string]: Readonly<Object>}, 
    entity: T
  ): void{
    for(const foreignProp of props){ //Map foreign entity to entity
        const foreignCfg = ModelStateConfig.get(foreignProp);
        entity[foreignCfg.foreignProp] = lookups[foreignProp][entity[foreignCfg.foreignKey]]
    }
}

function _mapChildrenToEntity<T>(
    props: string[], 
    propCfg: ModelConfig<T, any>, 
    lookups: {[key: string]: Readonly<Object>}, 
    entity: T
): void{
    for(let childProp of props){
        const entityId = entity[propCfg.identifier] as any;
        entity[childProp] = lookups[childProp][entityId]
    }
}