import { ModelStateConfig } from '../model-state.config';
import { _convertArrayToObject } from '@array/convert-array-to-object.helper';
import { _filter } from '@array/filter.helper';
import { Prop } from '@state/interfaces';
import { Immutable, UnknownState } from '@global/interfaces';

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
  const filtered = _filter(slice, filterFactory(modelCfg.identifier));

  if(filtered?.length < slice?.length) newState[stateProp] = filtered;

  if(modelCfg.children?.length)
    for(var childProp of modelCfg.children){
      const childSlice = <unknown[]> state[childProp];
      if(!modelCfg.foreignKey) { console.error(`No foreign key for property ${stateProp}`); continue };
      const childFiltered = _filter(childSlice, filterFactory(modelCfg.foreignKey));
      if(childFiltered?.length < childSlice?.length) newState[childProp] = childFiltered;
    }

  return <Immutable<Partial<TState>>> newState;
}

