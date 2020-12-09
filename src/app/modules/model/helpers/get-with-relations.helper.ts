import { _filter } from '@array/filter.helper';
import { _find } from '@array/find.helper';
import { GetWithRelationsConfig } from '../get-with-relations.config';
import { ModelStateConfig } from '../model-state.config';

export function _getWithRelations<TModel, TState>( 
    state: Readonly<Partial<TState>>,
    cfg: GetWithRelationsConfig<TState>,
    id: any, 
): TModel{
    const modelCfg = ModelStateConfig.get<TModel, TState>(cfg.modelProp); 

    const modelState = state[cfg.modelProp] as any;
    if(!modelState || modelState.length == 0) return null;

    let entity = _find<any>(modelState, id, modelCfg.identifier);
    
    if(!entity) return entity;

    for(const fkStateProp of cfg.includedForeignProps){
        const fkPropConfig = ModelStateConfig.get(fkStateProp);
        entity[fkPropConfig.foreignProp] = //Set object prop in detail prop equals to object with ID = fk id
            _find<any>(state[fkStateProp] as any, entity[fkPropConfig.foreignKey], fkPropConfig.identifier);
    }

    for(const childStateProp of cfg.includedChildProps){
        entity[childStateProp] = //Set object prop in detail prop equals to object with ID = fk id
            _filter<any>(state[childStateProp] as any, (x) => x[modelCfg.foreignKey] === id);
    }

    return entity;
}