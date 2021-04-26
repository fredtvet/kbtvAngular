import { _filter, _find } from 'array-helpers';
import { Immutable, Maybe } from 'global-types';
import { ModelConfig, RelationInclude, UnknownModelState } from '../interfaces';
import { _getModelConfig } from '../model-state-config-helpers';
import { _getRelationProps } from './get-relation-props.helper';

/**
 * Get model with specified relationships set on model
 * according to model property config {@link ModelConfig}
 * @param state State containing model and relationship data
 * @param cfg Configuration of which relationships to include
 * @param id A unique property value of the model that is requested.
 * @returns The requested model with relationships applied if found. 
 */
export function _getWithRelations<TModel extends {}, TState extends {}>( 
    state: Maybe<Immutable<Partial<TState>>>,
    cfg: Immutable<RelationInclude<TState>>,
    id: unknown, 
): Maybe<Immutable<TModel>> {
    const modelCfg = _getModelConfig<ModelConfig<TModel, TState>>(cfg.prop); 

    const modelState = (<Immutable<UnknownModelState>> state)[cfg.prop];
    if(!modelState || modelState.length == 0) return;

    const entity = _find(modelState, id, modelCfg.idProp);
    
    if(!entity) return;
    let entityClone = {...entity};

    const {foreigns, children} = _getRelationProps<TState>(cfg);

    for(const fkStateProp of foreigns){
        const fkPropConfig = _getModelConfig(fkStateProp);
        entityClone[<string> fkPropConfig.foreignProp] = //Set object prop in detail prop equals to object with ID = fk id
            _find(
                (<Immutable<UnknownModelState>> state)[fkStateProp],
                entity[<string> fkPropConfig.foreignKey], 
                fkPropConfig.idProp
            );
    }

    for(const childStateProp of children){
        entityClone[childStateProp as string] = //Set object prop in detail prop equals to object with ID = fk id
            _filter((<Immutable<UnknownModelState>> state)[childStateProp], (x) => x[<string> modelCfg.foreignKey] === id);
    }

    return <Immutable<TModel>> entityClone;
}