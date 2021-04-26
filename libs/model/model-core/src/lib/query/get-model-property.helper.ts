import { Immutable, Prop } from 'global-types';
import { ModelConfig } from '../interfaces';
import { _getModelConfig } from '../model-state-config-helpers';

/**
 * Get display value for model
 * @param prop Model state property
 * @param value Model value
 */
export function _getModelDisplayValue<TState, TModel = {}>(
    prop: Immutable<Prop<TState>>, 
    value: Immutable<TModel>): unknown {
    const fkPropModelMap = _getModelConfig<ModelConfig<TModel, TState>>(prop);
    return fkPropModelMap?.displayFn ? fkPropModelMap.displayFn(value) : null;
} 