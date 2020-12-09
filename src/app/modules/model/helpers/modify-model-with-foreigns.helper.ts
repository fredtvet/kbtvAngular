import { _add } from '@array/add.helper';
import { Prop } from '@state/interfaces';
import { ModelStateConfig } from '../model-state.config';

export function _modifyModelWithForeigns<TState>(
    state: Readonly<any>, 
    stateProp: Prop<TState>, 
    entity: Readonly<any>, 
    entityFn: (entity: any, stateSlice: ReadonlyArray<Object>) => Object
): Partial<TState>{

    const propCfg = ModelStateConfig.get(stateProp);
    const newState: any = {};
    const entityClone = {...entity};
    
    for(var fkProp of propCfg.foreigns || []){
        const fkPropConfig = ModelStateConfig.get(fkProp); //Key information about foreign prop
        const foreignEntity = entity[fkPropConfig.foreignProp];
        if(!foreignEntity) continue; //If no new entity, continue
        const foreignEntityId = foreignEntity[fkPropConfig.identifier];
        if(!foreignEntityId){ //No id on new entity? ignore and set null
            console.error(`Entity from ${stateProp} has foreign property from ${fkProp} set with no ID`)
            entityClone[fkPropConfig.foreignProp] = null;
            continue
        };

        newState[fkProp] = _add(state[fkProp], foreignEntity); //Add new fk entity
        entityClone[fkPropConfig.foreignKey] = foreignEntityId; //Set foreign key on entity
        entityClone[fkPropConfig.foreignProp] = null; //Remove foreign entity to prevent duplicate data    
    }
    
    newState[stateProp] = entityFn(entity, state[stateProp]);

    return newState;
}