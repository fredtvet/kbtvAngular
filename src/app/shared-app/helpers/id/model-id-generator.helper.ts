import { Model } from 'src/app/core/models';
import { ModelConfig, ModelStateConfig } from 'src/app/model/model-state.config';
import { _idGenerator } from './id-generator.helper';

export function _modelIdGenerator<TModel extends Model>(entity: TModel, modelCfg: ModelConfig<TModel>): TModel{
    if(!modelCfg) console.trace("No model state config provided");
    
    const id = entity[modelCfg.identifier]
    if(!id) entity[modelCfg.identifier] = _idGenerator() as any;

    for(var fkProp of modelCfg.foreigns || []){ //Run through fks, check if exist in object, create id if no id.
        const fkPropConfig = ModelStateConfig.get(fkProp); 
        const foreignEntity = entity[fkPropConfig.foreignProp];
        if(!foreignEntity || foreignEntity[fkPropConfig.identifier]) continue; //If no fk entity, or entity has ID already, continue
        foreignEntity[fkPropConfig.identifier] = _idGenerator();    
        entity[fkPropConfig.foreignProp] = foreignEntity;       
    }

    return entity;
 }