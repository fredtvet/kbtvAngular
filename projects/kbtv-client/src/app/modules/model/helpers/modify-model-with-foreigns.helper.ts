import { _add } from '@array/add.helper';
import { Immutable, ImmutableArray, UnknownState, Prop } from 'global-types';
import { ModelStateConfig } from '../model-state.config';

export function _modifyModelWithForeigns<TState extends {}>(
    state: Immutable<TState>, 
    stateProp: Immutable<Prop<TState>>, 
    entity: Immutable<UnknownState>, 
    entityFn: (entity: Immutable<{}>, stateSlice: ImmutableArray<{}>) => ImmutableArray<{}>
): Immutable<Partial<TState>>{

    const propCfg = ModelStateConfig.get<{}, TState>(stateProp);
    const newState: UnknownState = {};
    const entityClone = {...entity};
    
    for(var fkProp of propCfg.foreigns || []){
        const fkPropConfig = ModelStateConfig.get(fkProp); //Key information about foreign prop
        const foreignEntity = <{}> entity[<string> fkPropConfig.foreignProp];
        if(!foreignEntity) continue; //If no new entity, continue
        const foreignEntityId = foreignEntity[fkPropConfig.identifier];
        if(!foreignEntityId){ //No id on new entity? ignore and set null
            console.error(`Entity from ${stateProp} has foreign property from ${fkProp} set with no ID`)
            entityClone[<string> fkPropConfig.foreignProp] = null;
            continue
        };

        newState[fkProp] = _add(<ImmutableArray<{}>>(<UnknownState>state)[fkProp], foreignEntity); //Add new fk entity
        entityClone[<string> fkPropConfig.foreignKey] = foreignEntityId; //Set foreign key on entity
        entityClone[<string> fkPropConfig.foreignProp] = null; //Remove foreign entity to prevent duplicate data    
    }
    
    newState[stateProp] = entityFn(entityClone, <ImmutableArray<{}>>(<UnknownState>state)[stateProp]);

    return <Immutable<Partial<TState>>> newState;
}