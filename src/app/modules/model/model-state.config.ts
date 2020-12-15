import { Inject, Injectable } from '@angular/core';
import { Immutable } from '@immutable/interfaces';
import { Prop } from '@state/interfaces';
import { MODEL_CONFIGS } from './injection-tokens.const';
import { ModelConfig, ModelConfigMap } from './interfaces';

@Injectable({providedIn: "root"})
export class ModelStateConfig {

    private static modelConfigs: ModelConfig<unknown, unknown>[] = [];

    private static configMaps: {[key: string]: ModelConfigMap<unknown>} = {};

    constructor(@Inject(MODEL_CONFIGS) modelConfigs: ModelConfig<unknown, unknown>[]){
        ModelStateConfig.modelConfigs = modelConfigs;
    }

    static get<TModel, TState>(prop: Immutable<Prop<TState>>): Immutable<ModelConfig<TModel, TState>>{
        return this.getBy(prop, "stateProp");
    }

    static getBy<TModel, TState>(prop: Immutable<Prop<TState>>, key: Prop<ModelConfig<TModel, TState>>): Immutable<ModelConfig<TModel, TState>>{
        if(!this.configMaps[key]) this.configMaps[key] = this.createModelStateConfigMap(key);
        return this.configMaps[key][prop];
    }

    private static createModelStateConfigMap(prop: Prop<ModelConfig<unknown, unknown>>): ModelConfigMap<unknown>  {
        const map: ModelConfigMap<unknown> = {};
    
        for(let config of ModelStateConfig.modelConfigs){
            map[config[prop] as string] = config;
        }

        return map;
    }
}

