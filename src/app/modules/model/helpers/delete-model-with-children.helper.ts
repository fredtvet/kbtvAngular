import { _convertArrayToObject } from '@shared-app/helpers/array/convert-array-to-object.helper';
import { _filter } from '@shared-app/helpers/array/filter.helper';
import { Prop } from '@shared-app/prop.type';
import { ModelState } from '../interfaces/model-state.interface';
import { ModelStateConfig } from '../model-state.config';

export function _deleteModelWithChildren<TState>(
  state: TState, 
  stateProp: Prop<ModelState>, 
  cfg: {id?: string, ids?: string[]}
): Partial<TState>{

  if(!cfg.id && !cfg.ids) console.error("deleteEntityChildren config requires either id or ids property set.")       
  
  let filterFactory: (key: string) => (x: Object) => boolean;
  if(cfg.id) 
    filterFactory = (key: string) => (x: Object) => x[key] !== cfg.id;  
  else if(cfg.ids) {
    const idMap = _convertArrayToObject<string>(cfg.ids);
    filterFactory = (key: string) => (x: Object) => idMap[x[key]] === undefined;
  }

  const modelCfg = ModelStateConfig.get(stateProp);
  const newState = {};

  newState[stateProp] = 
    _filter(state[stateProp], filterFactory(modelCfg.identifier));

  if(modelCfg.children?.length)
    for(var childProp of modelCfg.children)
      newState[childProp] = 
        _filter(state[childProp], filterFactory(modelCfg.foreignKey));

  return newState;

}