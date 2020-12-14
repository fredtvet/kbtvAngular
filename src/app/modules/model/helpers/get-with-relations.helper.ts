import { _filter } from '@array/filter.helper';
import { _find } from '@array/find.helper';
import { Immutable } from '@immutable/interfaces';
import { GetWithRelationsConfig } from '../get-with-relations.config';
import { ModelStateConfig } from '../model-state.config';

export function _getWithRelations<TModel extends Object, TState>( 
    state: Immutable<Partial<TState>>,
    cfg: GetWithRelationsConfig<TState>,
    id: any, 
): Immutable<TModel>{
    const modelCfg = ModelStateConfig.get<TModel, TState>(cfg.modelProp); 

    const modelState = state[cfg.modelProp as string];
    if(!modelState || modelState.length == 0) return null;

    const entity = _find<TModel>(modelState, id, modelCfg.identifier as any);
    
    if(!entity) return;
    let entityClone = {...entity};

    for(const fkStateProp of cfg.includedForeignProps){
        const fkPropConfig = ModelStateConfig.get(fkStateProp as string);
        entityClone[fkPropConfig.foreignProp] = //Set object prop in detail prop equals to object with ID = fk id
            _find(state[fkStateProp as string], entity[fkPropConfig.foreignKey], fkPropConfig.identifier);
    }

    for(const childStateProp of cfg.includedChildProps){
        entityClone[childStateProp as string] = //Set object prop in detail prop equals to object with ID = fk id
            _filter(state[childStateProp as string], (x) => x[modelCfg.foreignKey] === id);
    }

    return entityClone;
}