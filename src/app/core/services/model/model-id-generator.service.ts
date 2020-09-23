import { Injectable } from '@angular/core';
import { Model } from '../../models';
import { IdGeneratorService } from '../id-generator.service';
import { ModelConfig, ModelStateConfig } from '../../model/model-state.config';

@Injectable({
  providedIn: 'root'
})
export class ModelIdGeneratorService {

  constructor(private idGenerator: IdGeneratorService) {}

 generateOnEntity<TModel extends Model>(entity: TModel, modelCfg: ModelConfig): TModel{
    if(!modelCfg) console.trace("No model state config provided");
    
    if(!entity[modelCfg.identifier]) //If entity no id, generate id
        entity[modelCfg.identifier] = this.idGenerator.generate();

    for(var fkProp of modelCfg.foreigns || []){ //Run through fks, check if exist in object, create id if no id. 
        const fkPropConfig = ModelStateConfig.get(fkProp); 
        const foreignEntity = entity[fkPropConfig.foreignProp];
        if(!foreignEntity || foreignEntity[fkPropConfig.identifier]) continue; //If no fk entity, or entity has ID already, continue
        foreignEntity[fkPropConfig.identifier] = this.idGenerator.generate();    
        entity[fkPropConfig.foreignProp] = foreignEntity;       
    }

    return entity;
 }
 

}
