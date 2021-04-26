import { Model } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { Immutable, UnknownState, Prop } from 'global-types';
import { ModelConfig, _getModelConfig } from 'model/core';
import { _idGenerator } from './id-generator.helper';

export function _modelIdGenerator<TModel extends Model>(stateProp: Prop<ModelState>, entity: Immutable<TModel>): Immutable<TModel>{
    const modelCfg = _getModelConfig<ModelConfig<TModel, ModelState>>(stateProp);
        console.log(entity);
    const clone = <UnknownState>{...entity}
    const id = clone[modelCfg.idProp as Prop<TModel>];
    
    if(!id) clone[modelCfg.idProp] = _idGenerator();

    for(var fkProp of modelCfg.foreigns || []){ //Run through fks, check if exist in object, create id if no id.
        const fkPropConfig = _getModelConfig(fkProp); 
        const foreignEntity = <UnknownState> clone[<string> fkPropConfig.foreignProp];

        if(!foreignEntity || foreignEntity[fkPropConfig.idProp]) continue; //If no fk entity, or entity has ID already, continue

        if(Object.keys(foreignEntity).length === 0){ //If foreign is empty, clean  up and continue         
            clone[<string> fkPropConfig.foreignProp] = undefined;
            continue;
        }

        clone[<string> fkPropConfig.foreignProp] = { ...foreignEntity, [fkPropConfig.idProp]: _idGenerator() };       
    }

    return <Immutable<TModel>> clone;
 }