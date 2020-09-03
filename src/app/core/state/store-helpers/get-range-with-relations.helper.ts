import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModelStateConfig, ModelPropertyConfig } from '../model-state.config';
import { Injectable } from '@angular/core';
import { GetWithRelationsConfig } from './get-with-relations.config';
import { ArrayHelperService } from '../../services/utility/array-helper.service';
import { ModelState } from '../global.state';
import { BaseEntity } from '../../models';

@Injectable({providedIn: "root"})
export class GetRangeWithRelationsHelper  {

    constructor(private arrayHelperService: ArrayHelperService) {}

    get$<TEntity extends BaseEntity>(
        stateSlice$: (properties: (keyof Partial<ModelState>)[]) => Observable<Partial<ModelState>>,
        cfg: GetWithRelationsConfig,
        filter?: (value: TEntity, index?: number, Array?: any[]) => boolean, 
    ): Observable<TEntity[]>{
        const modelCfg = ModelStateConfig[cfg.modelProp]; 
        if(!modelCfg) throw `No model state config for property ${cfg.modelProp}`;

        return stateSlice$(cfg.includedProps).pipe(
            map(state => {  
                let modelState = state[cfg.modelProp] as TEntity[];
                
                if(filter)
                    modelState = this.arrayHelperService.filter(modelState, filter);

                if(!modelState || modelState.length == 0) return modelState;

                const hasChildren = cfg.includedChildProps && cfg.includedChildProps.length > 0;      
                const hasForeigns = cfg.includedForeignProps && cfg.includedForeignProps.length > 0;

                let foreignLookups = {};
                if(hasForeigns)
                    foreignLookups = this.createStatePropertyLookups(cfg.includedForeignProps, state); 

                let childLookups = {};
                if(hasChildren) 
                    childLookups = this.createGroupedLookups(cfg.includedChildProps, modelCfg.foreignKey, state) 

                console.log(hasForeigns, hasChildren);
                if(hasForeigns || hasChildren){ console.log('loop')
                    for(var i = 0; i < modelState.length; i++){
                        let entity = modelState[i];                   
                            this.mapForeignsToEntity(cfg.includedForeignProps, foreignLookups, entity);        
                            this.mapChildrenToEntity(cfg.includedChildProps, modelCfg, childLookups, entity);
                        modelState[i] = entity;
                    }
                }
                return modelState
            })
        );

    }
    
    //Lookup of children grouped by foreign key
    private createGroupedLookups(
        props: (keyof Partial<ModelState>)[], 
        groupBy: string, state: Object
    ): {[key: string]: {[key: string]: Object[]}}{
        const lookups = {} as {[key: string]: {[key: string]: Object[]}}
        for(const prop of props){
            lookups[prop] = this.arrayHelperService.groupBy(state[prop], groupBy);
        }
        return lookups;
    }

    //Lookup of foreign entities by identifier
    private createStatePropertyLookups(
        props: (keyof Partial<ModelState>)[], 
        state: Object
    ): {[key: string]: Object}{
        const lookups = {} as {[key: string]: Object};
        for(const prop of props){ //Convert foreign state props to lookup tables
            const cfg = ModelStateConfig[prop];
            if(!cfg) throw `No model state config for property ${prop}`;
            lookups[prop] = this.arrayHelperService.convertArrayToObject(state[prop], cfg.identifier);
        }
        return lookups;
    }

    private mapForeignsToEntity<T>(
        props: (keyof Partial<ModelState>)[], 
        lookups: {[key: string]: Object}, 
        entity: T
    ): void{
        for(const foreignProp of props){ //Map foreign entity to entity
            const foreignCfg = ModelStateConfig[foreignProp];
            entity[foreignCfg.foreignProp] = lookups[foreignProp][entity[foreignCfg.foreignKey]]
        }
    }

    private mapChildrenToEntity<T>(
        props: (keyof Partial<ModelState>)[], 
        propCfg: ModelPropertyConfig, 
        lookups: {[key: string]: Object}, 
        entity: T
    ): void{
        for(let childProp of props){
            const entityId = entity[propCfg.identifier];
            entity[childProp] = lookups[childProp][entityId]
        }
    }

}
