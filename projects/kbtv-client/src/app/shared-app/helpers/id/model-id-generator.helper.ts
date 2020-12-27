import { Model } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { Immutable, UnknownState } from '@global/interfaces';
import { ModelStateConfig } from '@model/model-state.config';
import { Prop } from '@state/interfaces';
import { _idGenerator } from './id-generator.helper';

export function _modelIdGenerator<TModel extends Model>(stateProp: Prop<ModelState>, entity: Immutable<TModel>): Immutable<TModel>{
    const modelCfg = ModelStateConfig.get<TModel, ModelState>(stateProp);
  
    const clone = <UnknownState>{...entity}
    const id = clone[modelCfg.identifier as Prop<TModel>];
    
    if(!id) clone[modelCfg.identifier] = _idGenerator();

    for(var fkProp of modelCfg.foreigns || []){ //Run through fks, check if exist in object, create id if no id.
        const fkPropConfig = ModelStateConfig.get(fkProp); 
        const foreignEntity = <UnknownState> clone[<string> fkPropConfig.foreignProp];
        if(!foreignEntity || foreignEntity[fkPropConfig.identifier]) continue; //If no fk entity, or entity has ID already, continue
        const foreignClone = {...foreignEntity};
        foreignClone[fkPropConfig.identifier] = _idGenerator();    
        clone[<string> fkPropConfig.foreignProp] = foreignClone;       
    }

    return <Immutable<TModel>> clone;
 }