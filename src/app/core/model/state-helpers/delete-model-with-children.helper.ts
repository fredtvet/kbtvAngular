import { Injectable } from '@angular/core';
import { ModelStateConfig } from '../model-state.config';
import { Prop } from '../state.types';
import { ModelState } from '../model.state';
import { _filter } from 'src/app/shared-app/helpers/array/filter.helper';

@Injectable({providedIn: "root"})
export class DeleteModelWithChildrenHelper{

    constructor(){}

    delete<TState>(state: TState, stateProp: Prop<ModelState>, cfg: {id?: string, ids?: string[]}): Partial<TState>{
        if(!cfg.id && !cfg.ids) console.error("deleteEntityChildren config requires either id or ids property set.")       
        const modelCfg = ModelStateConfig.get(stateProp);

        let newState: Partial<TState> = {};
    
        let childFilter: (x: Object) => boolean;
        if(cfg.id) {
          childFilter = (x) => x[modelCfg.foreignKey] !== cfg.id;
          newState[stateProp] = 
            _filter(state[stateProp], (t: Object) => t[modelCfg.identifier] !== cfg.id);
        }
        else if(cfg.ids) {
          childFilter = (x) => !cfg.ids.includes(x[modelCfg.foreignKey]);
          newState[stateProp] = 
            _filter(state[stateProp], (t: Object) => !cfg.ids.includes(t[modelCfg.identifier]))
        }
    
        for(var childProp of modelCfg.children || []){
            newState[childProp] = _filter(state[childProp], childFilter);
        };
    
        return newState;
    }

}   