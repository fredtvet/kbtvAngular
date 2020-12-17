import { _filter } from '@array/filter.helper';
import { _find } from '@array/find.helper';
import { Immutable, Maybe } from '@global/interfaces';
import { UnknownModelState } from '@model/interfaces';
import { GetWithRelationsConfig } from '../get-with-relations.config';
import { ModelStateConfig } from '../model-state.config';

export function _getWithRelations<TModel extends {}, TState extends {}>( 
    state: Maybe<Immutable<Partial<TState>>>,
    cfg: GetWithRelationsConfig<TState>,
    id: unknown, 
): Maybe<Immutable<TModel>> {
    const modelCfg = ModelStateConfig.get<TModel, TState>(cfg.modelProp); 

    const modelState = (<Immutable<UnknownModelState>> state)[cfg.modelProp];
    if(!modelState || modelState.length == 0) return;

    const entity = _find(modelState, id, modelCfg.identifier);
    
    if(!entity) return;
    let entityClone = {...entity};

    for(const fkStateProp of cfg.includedForeignProps){
        const fkPropConfig = ModelStateConfig.get(fkStateProp as string);
        entityClone[<string> fkPropConfig.foreignProp] = //Set object prop in detail prop equals to object with ID = fk id
            _find(
                (<Immutable<UnknownModelState>> state)[fkStateProp],
                entity[<string> fkPropConfig.foreignKey], 
                fkPropConfig.identifier
            );
    }

    for(const childStateProp of cfg.includedChildProps){
        entityClone[childStateProp as string] = //Set object prop in detail prop equals to object with ID = fk id
            _filter((<Immutable<UnknownModelState>> state)[childStateProp], (x) => x[<string> modelCfg.foreignKey] === id);
    }

    return <Immutable<TModel>> entityClone;
}