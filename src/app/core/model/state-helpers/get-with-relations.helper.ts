import { Injectable } from '@angular/core';
import { GetWithRelationsConfig } from './get-with-relations.config';
import { ArrayHelperService } from '../../services/utility/array-helper.service';
import { Model } from '../../models';
import { ModelState } from '../model.state';
import { ModelStateConfig } from '../model-state.config';

@Injectable({providedIn: "root"})
export class GetWithRelationsHelper  {

    constructor( private arrayHelperService: ArrayHelperService) { }

    get<TModel extends Model>( 
        state: Partial<ModelState>,
        cfg: GetWithRelationsConfig,
        id: any, 
    ): TModel{
        const modelCfg = ModelStateConfig.get(cfg.modelProp); 

        const modelState = state[cfg.modelProp] as TModel[];
        if(!modelState || modelState.length == 0) return null;

        let entity = this.arrayHelperService.find(modelState, id, modelCfg.identifier);
        if(!entity) return entity;

        for(const fkStateProp of cfg.includedForeignProps){
            const fkPropConfig = ModelStateConfig.get(fkStateProp as string);
            entity[fkPropConfig.foreignProp] = //Set object prop in detail prop equals to object with ID = fk id
                this.arrayHelperService.find(state[fkStateProp as string], entity[fkPropConfig.foreignKey], fkPropConfig.identifier);
        }

        for(const childStateProp of cfg.includedChildProps){
            entity[childStateProp] = //Set object prop in detail prop equals to object with ID = fk id
                this.arrayHelperService.filter(state[childStateProp as string], (x) => x[modelCfg.foreignKey] === id);
        }

        return entity;
    }

}
