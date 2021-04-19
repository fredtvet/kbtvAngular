import { Immutable, ImmutableArray, Prop, UnknownState } from "global-types";
import { ModelConfig, ModelConfigMap } from "./interfaces";

type ModelState<TConfig> = TConfig extends ModelConfig<any, (infer TState)> ? TState : never

let _modelConfigs: ImmutableArray<ModelConfig<any, any>>;
let _configMaps: { [key: string]: ModelConfigMap<any> } = {}

/** Set model configurations. Should be called once on initalization.  */
export function _registerModelStateConfig<
    TConfig extends ModelConfig<any, any> = ModelConfig<any, any>
>(configs: TConfig[]): void{
    if (_modelConfigs?.length) return;
    _modelConfigs = configs;
}

/** Get model config for given state property */
export function _getModelConfig<
  TConfig extends ModelConfig<any, any> = ModelConfig<UnknownState, any>
>(
  prop: Immutable<Prop<ModelState<TConfig>>>
): Immutable<TConfig> {
  return _getModelConfigBy<TConfig>(prop, <Prop<Immutable<TConfig>>> "stateProp");
}

/** Get model config for given state property grouped by key */
export function _getModelConfigBy<
    TConfig extends ModelConfig<any, ModelState<TConfig>> = ModelConfig<UnknownState, any>
>(prop: string, key: Prop<Immutable<TConfig>>): Immutable<TConfig> {
  if (!_configMaps[key])
    _configMaps[key] = _createModelStateConfigMap<TConfig>(key);
  return <Immutable<TConfig>> _configMaps[key][prop];
}

/** Get model config for given state property */
export function _getAllModelConfigs<
  TConfig extends ModelConfig<any, any> = ModelConfig<UnknownState, any>
>(): ImmutableArray<TConfig> {
  return <ImmutableArray<TConfig>> _modelConfigs;
}

function _createModelStateConfigMap<
  TConfig extends ModelConfig<any, any>
>(prop: Prop<Immutable<TConfig>>): ModelConfigMap<UnknownState, TConfig> {
  const map: ModelConfigMap<UnknownState, TConfig> = {};

  for (let config of <Immutable<TConfig>[]> _modelConfigs) {
    map[config[prop] as unknown as string] = config;
  }

  return map;
}