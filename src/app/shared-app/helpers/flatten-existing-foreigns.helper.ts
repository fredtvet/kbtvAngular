import { _find } from '@array/find.helper';
import { Model } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { Immutable } from '@immutable/interfaces';
import { ModelStateConfig } from '@model/model-state.config';
import { Prop } from '@state/interfaces';

export function _flattenExistingForeigns<TEntity>(
    prop: Prop<ModelState>, 
    entity: Immutable<TEntity>, 
    state: Immutable<Partial<ModelState>>): Immutable<TEntity>{
    
    const {foreigns} = ModelStateConfig.get(prop);
    
    var entityClone = {...entity};
    if(!foreigns) return entityClone;
    
    for(const foreignStateProp of foreigns){
        const {foreignKey, displayProp, foreignProp, identifier} = ModelStateConfig.get(foreignStateProp);
        const fkEntity = entityClone[foreignProp];
        if(!fkEntity) continue; //If no fk entity set on entity, ignore

        const fkDisplayValue = fkEntity[displayProp]; //Fetch display value used in auto completes   

        if(!fkDisplayValue) //If no fk value provided, set foreign key to null on entity 
            entityClone[foreignKey] = null;

        const existingFkEntity = //Check if fkEntity with same display value exists
            _find<Model>(state[foreignStateProp], fkDisplayValue, displayProp)

        if(existingFkEntity) //If existing fkEntity, set foreign key on entity
            entityClone[foreignKey] = existingFkEntity[identifier]; 
        
        if(existingFkEntity || !fkDisplayValue) //If no fkEntity or fk value provided, set nested fk entity to null
            entityClone[foreignProp] = null;
    }

    return entityClone;
}