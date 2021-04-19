import { _add } from 'array-helpers';
import { Immutable, ImmutableArray, UnknownState, Prop } from 'global-types';
import { _getModelConfig } from '../model-state-config-helpers';

/**
 * Add or update a model and any foreign relationships set on the provided model value 
 * according to {@link ModelConfig}
 * @param state State containing model and foregin data
 * @param stateProp Model state property of the model
 * @param entity The model value with optional foreign props
 * @param entityFn A modifier function to add or update the model. 
 * @returns State with model and foreigns added or updated. 
 */
export function _modifyModelWithForeigns<TState extends {}>(
    state: Immutable<TState>, 
    stateProp: Immutable<Prop<TState>>, 
    entity: Immutable<UnknownState>, 
    entityFn: (entity: Immutable<{}>, stateSlice: ImmutableArray<{}>) => ImmutableArray<{}>
): Immutable<Partial<TState>>{

    const propCfg = _getModelConfig(stateProp);
    const newState: UnknownState = {};
    const entityClone = {...entity};
    
    for(var fkProp of propCfg.foreigns || []){
        const fkPropConfig = _getModelConfig(fkProp); //Key information about foreign prop
        const foreignEntity = <UnknownState> entity[<string> fkPropConfig.foreignProp];
        if(!foreignEntity) continue; //If no new entity, continue
        const foreignEntityId = foreignEntity[fkPropConfig.idProp];
        if(!foreignEntityId){ //No id on new entity? ignore and set null
            console.error(`Entity from ${stateProp} has foreign property from ${fkProp} set with no ID`)
            entityClone[<string> fkPropConfig.foreignProp] = null;
            continue
        };

        newState[fkProp] = _add(<ImmutableArray<{}>>(<UnknownState> state)[fkProp], foreignEntity); //Add new fk entity
        entityClone[<string> fkPropConfig.foreignKey] = foreignEntityId; //Set foreign key on entity
        entityClone[<string> fkPropConfig.foreignProp] = null; //Remove foreign entity to prevent duplicate data    
    }
    
    newState[stateProp] = entityFn(entityClone, <ImmutableArray<{}>>(<UnknownState>state)[stateProp]);

    return <Immutable<Partial<TState>>> newState;
}