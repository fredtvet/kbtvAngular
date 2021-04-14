import { Inject, Injectable } from '@angular/core';
import { Immutable, Prop } from 'global-types';
import { MODEL_CONFIGS } from './injection-tokens.const';
import { ModelConfig, ModelConfigMap } from './interfaces';

/** Responsible for setting & reading model state config data. */
@Injectable({providedIn: "root"})
export class ModelStateConfig {

    private static modelConfigs: ModelConfig<unknown, unknown>[] = [];

    private static configMaps: { [key: string]: ModelConfigMap<unknown> } = {};

    constructor(@Inject(MODEL_CONFIGS) modelConfigs: ModelConfig<unknown, unknown>[]){
        ModelStateConfig.modelConfigs = modelConfigs;
    }

    /** Get model config for given state property */
    static get<TModel, TState>(prop: Immutable<Prop<TState>>): Immutable<ModelConfig<TModel, TState>>{
        return ModelStateConfig.getBy(prop, "stateProp");
    }

    /** Get model config for given state property grouped by key */
    static getBy<TModel, TState>(prop: Immutable<Prop<TState>>, key: Prop<ModelConfig<TModel, TState>>): Immutable<ModelConfig<TModel, TState>>{
        if(!ModelStateConfig.configMaps[key]) ModelStateConfig.configMaps[key] = ModelStateConfig.createModelStateConfigMap(key);
        return ModelStateConfig.configMaps[key][prop];
    }

    private static createModelStateConfigMap(prop: Prop<ModelConfig<unknown, unknown>>): ModelConfigMap<unknown>  {
        const map: ModelConfigMap<unknown> = {};
    
        for(let config of ModelStateConfig.modelConfigs){
            map[config[prop] as string] = config;
        }

        return map;
    }
}

