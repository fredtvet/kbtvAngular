import { Injectable } from '@angular/core';
import { ModelStateConfig } from '../model-state.config';
import { _add } from 'src/app/shared-app/helpers/array/add.helper';
import { ModelState } from '../interfaces/model-state.interface';
import { Prop } from 'src/app/shared-app/prop.type';

@Injectable({providedIn: "root"})
export class ModifyModelWithForeignsHelper{

    constructor(){}

    modify<TState>(
        state: TState, 
        stateProp: Prop<ModelState>, 
        entity: any, 
        entityFn: (entity: any, stateSlice: any) => any
        ): Partial<TState>{

        const propCfg = ModelStateConfig.get(stateProp);
        if(!entity[propCfg.identifier]) console.error(`Trying to modify entity with no ID from property ${stateProp}`)
        let newState: Partial<TState> = {};
        
        for(var fkProp of propCfg.foreigns || []){
            const fkPropConfig = ModelStateConfig.get(fkProp); //Key information about foreign prop
            const foreignEntity = entity[fkPropConfig.foreignProp];
            if(!foreignEntity) continue; //If no new entity, continue
            const foreignEntityId = foreignEntity[fkPropConfig.identifier];
            if(!foreignEntityId){ //No id on new entity? ignore and set null
                console.error(`Entity from ${stateProp} has foreign property from ${fkProp} set with no ID`)
                entity[fkPropConfig.foreignProp] = null;
                continue
            };
            newState[fkProp] = _add(state[fkProp], foreignEntity); //Add new fk entity
            entity[fkPropConfig.foreignKey] = foreignEntityId; //Set foreign key on entity
            entity[fkPropConfig.foreignProp] = null; //Remove foreign entity to prevent duplicate data    
        }

        newState[stateProp as string] = entityFn(entity, state[stateProp]);
        
        return newState;
    }
}   