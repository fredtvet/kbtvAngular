import { Inject, Injectable } from '@angular/core';
import { Prop } from '@state/interfaces';
import { MODEL_CONFIGS } from './injection-tokens.const';
import { ModelConfig, ModelConfigMap } from './interfaces';

@Injectable({providedIn: "root"})
export class ModelStateConfig {

    private static modelConfigs: ModelConfig<any, any>[] = [];

    private static configMaps: {[key: string]: ModelConfigMap<any>} = {};

    constructor(@Inject(MODEL_CONFIGS) modelConfigs: ModelConfig<any, any>[]){
        ModelStateConfig.modelConfigs = modelConfigs;
    }

    static get<TModel, TState>(prop: Prop<TState>): ModelConfig<TModel, TState>{
        return this.getBy(prop, "stateProp");
    }

    static getBy<TModel, TState>(prop: Prop<TState>, key: Prop<ModelConfig<TModel, TState>>): ModelConfig<TModel, TState>{
        if(!this.configMaps[key]) this.configMaps[key] = this.createModelStateConfigMap(key);
        return this.configMaps[key][prop];
    }

    private static createModelStateConfigMap(prop: Prop<ModelConfig<any, any>>): ModelConfigMap<any>  {
        const map: ModelConfigMap<any> = {};
    
        for(let config of ModelStateConfig.modelConfigs){
            map[config[prop] as string] = config;
        }

        return map;
    }
}

