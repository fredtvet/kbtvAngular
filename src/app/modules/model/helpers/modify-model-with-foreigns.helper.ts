import { _add } from '@array/add.helper';
import { Immutable, ImmutableArray } from '@immutable/interfaces';
import { Prop } from '@state/interfaces';
import { ModelStateConfig } from '../model-state.config';

export function _modifyModelWithForeigns<TState extends Object>(
    state: Immutable<TState>, 
    stateProp: Immutable<Prop<TState>>, 
    entity: Immutable<Object>, 
    entityFn: (entity: Immutable<Object>, stateSlice: ImmutableArray<Object>) => ImmutableArray<Object>
): Immutable<Partial<TState>>{

    const propCfg = ModelStateConfig.get<Object, TState>(stateProp);
    const newState: Partial<TState> = {};
    const entityClone = {...entity};
    
    for(var fkProp of propCfg.foreigns || []){
        const fkPropConfig = ModelStateConfig.get(fkProp as string); //Key information about foreign prop
        const foreignEntity = entity[fkPropConfig.foreignProp];
        if(!foreignEntity) continue; //If no new entity, continue
        const foreignEntityId = foreignEntity[fkPropConfig.identifier];
        if(!foreignEntityId){ //No id on new entity? ignore and set null
            console.error(`Entity from ${stateProp} has foreign property from ${fkProp} set with no ID`)
            entityClone[fkPropConfig.foreignProp] = null;
            continue
        };

        newState[fkProp as string] = _add(state[fkProp as string], foreignEntity); //Add new fk entity
        entityClone[fkPropConfig.foreignKey] = foreignEntityId; //Set foreign key on entity
        entityClone[fkPropConfig.foreignProp] = null; //Remove foreign entity to prevent duplicate data    
    }
    
    newState[stateProp as string] = entityFn(entity, state[stateProp as string]);

    return <Immutable<Partial<TState>>> newState;
}