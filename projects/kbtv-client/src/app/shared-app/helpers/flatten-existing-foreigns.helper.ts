import { _find } from 'array-helpers';
import { ModelState } from '@core/state/model-state.interface';
import { Immutable, Maybe, UnknownState, Prop } from 'global-types';
import { ModelStateConfig } from '@model/model-state.config';

export function _flattenExistingForeigns<TEntity>(
    prop: Prop<ModelState>, 
    entity: Immutable<TEntity>, 
    state: Maybe<Immutable<Partial<ModelState>>>): Immutable<TEntity>{
    
    const {foreigns} = ModelStateConfig.get(prop);    
    var entityClone = <UnknownState> {...entity};

    if(!foreigns) return <Immutable<TEntity>> entityClone;
    if(!state) state = {};

    for(const foreignStateProp of foreigns){
        const {foreignKey, displayProp, foreignProp, identifier} = ModelStateConfig.get<UnknownState, ModelState>(foreignStateProp);
        const fkEntity = <UnknownState> entityClone[<string> foreignProp];
        if(!fkEntity) continue; //If no fk entity set on entity, ignore

        const fkDisplayValue = fkEntity[<string> displayProp]; //Fetch display value used in auto completes   

        if(!fkDisplayValue) //If no fk value provided, set foreign key to null on entity 
            entityClone[<string> foreignKey] = null;

        const existingFkEntity = //Check if fkEntity with same display value exists
            _find<UnknownState>(<UnknownState[]> state[foreignStateProp], fkDisplayValue, <string> displayProp)

        if(existingFkEntity) //If existing fkEntity, set foreign key on entity 
            entityClone[<string> foreignKey] = existingFkEntity[identifier]; 
        
        if(existingFkEntity || !fkDisplayValue) //If no fkEntity or fk value provided, set nested fk entity to null
            entityClone[<string> foreignProp] = null;
    }

    return <Immutable<TEntity>> entityClone;
}