import { _convertArrayToObject, _filter, _removeById, _removeRangeById, _removeRangeByProp } from 'array-helpers';
import { Immutable, Prop, UnknownState } from 'global-types';
import { ModelStateConfig } from '../model-state.config';

/**  
 * Responsible for deleting model with given id(s) 
 * and children with cascadeDelete set to true. 
 * @param state The state containing model & child state.
 * @param stateProp The state property of the model thats being deleted.
 * @param cfg The id or ids of the model(s) to be deleted.
 * @returns Updated state with deletion applied. 
*/
export function _deleteModelWithChildren<TState extends UnknownState>(
  state: Immutable<TState>, 
  stateProp: Immutable<Prop<TState>>, 
  cfg: Immutable<{id?: unknown, ids?: unknown[]}>
): Immutable<Partial<TState>> {

  if(!cfg.id && !cfg.ids) console.error("deleteEntityChildren config requires either id or ids property set.")       

  const modelCfg = ModelStateConfig.get(stateProp);
  const newState: UnknownState = {};
  const slice = <unknown[]> state[<string> stateProp];

  const filtered = cfg.ids ? 
    _removeRangeById(slice, cfg.ids, modelCfg.idProp) : 
    _removeById(slice, cfg.id, modelCfg.idProp);

  if(filtered?.length < slice?.length) newState[stateProp] = filtered;

  if(modelCfg.children?.length)
    for(var childRel of modelCfg.children){
      if(!childRel.cascadeDelete) continue;

      const childSlice = <UnknownState[]> state[childRel.prop];

      if(!modelCfg.foreignKey) { console.error(`No foreign key for property ${stateProp}`); continue };

      const childFiltered = _removeRangeByProp(childSlice, cfg.ids || cfg.id, modelCfg.foreignKey);

      if(childFiltered?.length < childSlice?.length) newState[childRel.prop] = childFiltered;
    }

  return <Immutable<Partial<TState>>> newState;
}

