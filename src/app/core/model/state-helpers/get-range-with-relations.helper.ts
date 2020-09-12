import { Injectable } from '@angular/core';
import { GetWithRelationsConfig } from './get-with-relations.config';
import { ArrayHelperService } from '../../services/utility/array-helper.service';
import { Model } from '../../models';
import { ModelState } from '../model.state';
import { ModelStateConfig, ModelConfig } from '../model-state.config';

@Injectable({providedIn: "root"})
export class GetRangeWithRelationsHelper  {

    constructor(private arrayHelperService: ArrayHelperService) {}

    get<TModel extends Model>(
        state: Partial<ModelState>,
        cfg: GetWithRelationsConfig,
        filter?: (value: TModel, index?: number, Array?: any[]) => boolean, 
    ): TModel[] {
        const modelCfg = ModelStateConfig.get(cfg.modelProp); 

        let modelState = state[cfg.modelProp] as TModel[];
        
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

        if(hasForeigns || hasChildren){
            for(var i = 0; i < modelState.length; i++){
                let entity = modelState[i];                   
                    this.mapForeignsToEntity(cfg.includedForeignProps, foreignLookups, entity);        
                    this.mapChildrenToEntity(cfg.includedChildProps, modelCfg, childLookups, entity);
                modelState[i] = entity;
            }
        }
        return modelState
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
            const cfg = ModelStateConfig.get(prop as string); 
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
            const foreignCfg = ModelStateConfig.get(foreignProp as string);
            entity[foreignCfg.foreignProp] = lookups[foreignProp][entity[foreignCfg.foreignKey]]
        }
    }

    private mapChildrenToEntity<T>(
        props: (keyof Partial<ModelState>)[], 
        propCfg: ModelConfig, 
        lookups: {[key: string]: Object}, 
        entity: T
    ): void{
        for(let childProp of props){
            const entityId = entity[propCfg.identifier];
            entity[childProp] = lookups[childProp][entityId]
        }
    }

}
