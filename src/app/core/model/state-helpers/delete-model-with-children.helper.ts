import { ArrayHelperService } from '../../services/utility/array-helper.service';
import { Injectable } from '@angular/core';
import { ModelStateConfig } from '../model-state.config';

@Injectable({providedIn: "root"})
export class DeleteModelWithChildrenHelper{

    constructor(private arrayHelperService: ArrayHelperService){}

    delete<TState>(state: TState, stateProp: keyof TState, cfg: {id?: string, ids?: string[]}): Partial<TState>{
        if(!cfg.id && !cfg.ids) console.error("deleteEntityChildren config requires either id or ids property set.")       
        const modelCfg = ModelStateConfig.get(stateProp as string);

        let newState: Partial<TState> = {};
    
        let childFilter: (x: Object) => boolean;
        if(cfg.id) {
          childFilter = (x) => x[modelCfg.foreignKey] !== cfg.id;
          newState[stateProp as string] = 
            this.arrayHelperService.filter(state[stateProp as string], (t: Object) => t[modelCfg.identifier] !== cfg.id);
        }
        else if(cfg.ids) {
          childFilter = (x) => !cfg.ids.includes(x[modelCfg.foreignKey]);
          newState[stateProp as string] = 
            this.arrayHelperService.filter(state[stateProp as string], (t: Object) => !cfg.ids.includes(t[modelCfg.identifier]))
        }
    
        for(var childProp of modelCfg.children || []){
            newState[childProp] = 
                this.arrayHelperService.filter(state[childProp], childFilter);
        };
    
        return newState;
    }

}   