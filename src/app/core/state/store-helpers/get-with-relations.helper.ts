import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModelStateConfig } from '../model-state.config';
import { Injectable } from '@angular/core';
import { GetWithRelationsConfig } from './get-with-relations.config';
import { ArrayHelperService } from '../../services/utility/array-helper.service';
import { BaseEntity } from '../../models';
import { ModelState } from '../global.state';

@Injectable({providedIn: "root"})
export class GetWithRelationsHelper  {

    constructor( private arrayHelperService: ArrayHelperService) { console.log('EYO') }

    get$<TEntity extends BaseEntity>( 
        stateSlice$: (properties: (keyof Partial<ModelState>)[]) => Observable<Partial<ModelState>>,
        id: any, 
        cfg: GetWithRelationsConfig
    ): Observable<TEntity>{
        const modelCfg = ModelStateConfig[cfg.modelProp]; 
        if(!modelCfg) throw `No model state config for property ${cfg.modelProp}`;
      
        return stateSlice$(cfg.includedProps).pipe(
            map(state => {
                const modelState = state[cfg.modelProp] as TEntity[];
                if(!modelState || modelState.length == 0) return null;

                let entity = this.arrayHelperService.find(modelState, id, modelCfg.identifier);
                if(!entity) return entity;

                for(const fkStateProp of cfg.includedForeignProps){
                    const fkPropConfig = ModelStateConfig[fkStateProp];
                    if(!fkPropConfig) throw `No model state config for property ${fkStateProp}`;
                    entity[fkPropConfig.foreignProp] = //Set object prop in detail prop equals to object with ID = fk id
                        this.arrayHelperService.find(state[fkStateProp], entity[fkPropConfig.foreignKey], fkPropConfig.identifier);
                }

                for(const childStateProp of cfg.includedChildProps){
                    const childPropConfig = ModelStateConfig[childStateProp];
                    if(!childPropConfig) throw `No model state config for property ${childStateProp}`;
                    entity[childStateProp] = //Set object prop in detail prop equals to object with ID = fk id
                        this.arrayHelperService.filter(state[childStateProp], (x) => x[modelCfg.foreignKey] === id);
                }
        
                return entity;
            })
        );
    }

}
