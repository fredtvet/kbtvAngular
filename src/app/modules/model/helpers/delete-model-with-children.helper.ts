import { ModelStateConfig } from '../model-state.config';
import { _convertArrayToObject } from '@array/convert-array-to-object.helper';
import { _filter } from '@array/filter.helper';
import { Prop } from '@state/interfaces';
import { Immutable } from '@immutable/interfaces';

export function _deleteModelWithChildren<TState>(
  state: Immutable<TState>, 
  stateProp: Prop<TState>, 
  cfg: Immutable<{id?: string, ids?: string[]}>
): Immutable<Partial<TState>> {

  if(!cfg.id && !cfg.ids) console.error("deleteEntityChildren config requires either id or ids property set.")       
  
  let filterFactory: (key: string) => (x: Object) => boolean;

  if(cfg.id) 
    filterFactory = (key: string) => (x: Object) => x[key] !== cfg.id;  
  else if(cfg.ids) {
    const idMap = _convertArrayToObject<string>(cfg.ids);
    filterFactory = (key: string) => (x: Object) => idMap[x[key]] === undefined;
  }

  const modelCfg = ModelStateConfig.get(stateProp);
  const newState: any = {};
  const slice = state[stateProp as string];
  const filtered = _filter<any>(slice, filterFactory(modelCfg.identifier));

  if(filtered?.length < slice?.length) newState[stateProp] = filtered;

  if(modelCfg.children?.length)
    for(var childProp of modelCfg.children){
      const childSlice = state[childProp as string];
      const childFiltered = _filter<any>(childSlice, filterFactory(modelCfg.foreignKey));
      if(childFiltered?.length < childSlice?.length) newState[childProp] = childFiltered;
    }

  return <Immutable<Partial<TState>>> newState;
}

