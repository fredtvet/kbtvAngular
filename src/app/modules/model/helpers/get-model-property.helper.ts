import { Immutable } from '@immutable/interfaces';
import { Prop } from '@state/interfaces';
import { ModelStateConfig } from '../model-state.config';

export function _getModelDisplayValue<TState, TModel = Object>(prop: Immutable<Prop<TState>>, value: Immutable<TModel>): unknown {
    const fkPropModelMap = ModelStateConfig.get(prop)
    return fkPropModelMap ? value[fkPropModelMap.displayProp] : null;
} 