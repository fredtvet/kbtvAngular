import { Injectable } from '@angular/core';
import { GetWithRelationsConfig } from './get-with-relations.config';
import { ModelStateConfig } from '../model-state.config';
import { _filter } from 'src/app/shared-app/helpers/array/filter.helper';
import { _find } from 'src/app/shared-app/helpers/array/find.helper';
import { ModelState } from '../interfaces/model-state.interface';
import { Model } from 'src/app/core/models/base-entity.interface';

@Injectable({providedIn: "root"})
export class GetWithRelationsHelper  {

    constructor() { }

    get<TModel extends Model>( 
        state: Partial<ModelState>,
        cfg: GetWithRelationsConfig,
        id: any, 
    ): TModel{
        const modelCfg = ModelStateConfig.get(cfg.modelProp); 

        const modelState = state[cfg.modelProp] as TModel[];
        if(!modelState || modelState.length == 0) return null;

        let entity = _find(modelState, id, modelCfg.identifier);
        if(!entity) return entity;

        for(const fkStateProp of cfg.includedForeignProps){
            const fkPropConfig = ModelStateConfig.get(fkStateProp);
            entity[fkPropConfig.foreignProp] = //Set object prop in detail prop equals to object with ID = fk id
                _find<any>(state[fkStateProp], entity[fkPropConfig.foreignKey], fkPropConfig.identifier);
        }

        for(const childStateProp of cfg.includedChildProps){
            entity[childStateProp] = //Set object prop in detail prop equals to object with ID = fk id
                _filter<any>(state[childStateProp], (x) => x[modelCfg.foreignKey] === id);
        }

        return entity;
    }

}
