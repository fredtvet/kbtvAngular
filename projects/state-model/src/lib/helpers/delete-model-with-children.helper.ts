import { _convertArrayToObject, _filter } from 'array-helpers';
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
  
  let filterFactory: (key: string) => (x: {}) => boolean = 
    (key: string) => (x: UnknownState) => x[key] !== cfg.id;  ;

  if(cfg.ids) {
    const idMap = _convertArrayToObject(cfg.ids);
    filterFactory = (key: string) => (x: UnknownState) => idMap[<string> x[key]] === undefined;
  }

  const modelCfg = ModelStateConfig.get(stateProp);
  const newState: UnknownState = {};
  const slice = <unknown[]> state[<string> stateProp];
  const filtered = _filter(slice, filterFactory(modelCfg.idProp));

  if(filtered?.length < slice?.length) newState[stateProp] = filtered;

  if(modelCfg.children?.length)
    for(var childRel of modelCfg.children){
      if(!childRel.cascadeDelete) continue;
      const childSlice = <unknown[]> state[childRel.prop];
      if(!modelCfg.foreignKey) { console.error(`No foreign key for property ${stateProp}`); continue };
      const childFiltered = _filter(childSlice, filterFactory(modelCfg.foreignKey));
      if(childFiltered?.length < childSlice?.length) newState[childRel.prop] = childFiltered;
    }

  return <Immutable<Partial<TState>>> newState;
}

