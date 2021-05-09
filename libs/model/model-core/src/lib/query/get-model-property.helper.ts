import { Immutable } from 'global-types';
import { StateModels, StatePropByModel } from '../interfaces';
import { _getModelConfig } from '../model-state-config-helpers';

/**
 * Get display value for model
 * @param prop Model state property
 * @param value Model value
 */
export function _getModelDisplayValue<TState, TModel extends StateModels<TState> = StateModels<TState>>(
    prop: Immutable<StatePropByModel<TState, TModel>>, 
    value: Immutable<TModel>): unknown {
    const fkPropModelMap = _getModelConfig<TState, TModel>(prop);
    return fkPropModelMap?.displayFn ? fkPropModelMap.displayFn(value) : null;
} 