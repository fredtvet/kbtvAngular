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

  newState[stateProp] = 
    _filter<any>(state[stateProp as string], filterFactory(modelCfg.identifier));

  if(modelCfg.children?.length)
    for(var childProp of modelCfg.children)
      newState[childProp] = 
        _filter(state[childProp as string], filterFactory(modelCfg.foreignKey));

  return <Immutable<Partial<TState>>> newState;
}