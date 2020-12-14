import { Immutable } from '@immutable/interfaces';
import { Prop } from '@state/interfaces';
import { ModelStateConfig } from '../model-state.config';

export function _getModelDisplayValue<TState, TModel = any>(prop: Prop<TState>, value: Immutable<TModel>): any {
    const fkPropModelMap = ModelStateConfig.get(prop)
    return fkPropModelMap ? value[fkPropModelMap.displayProp] : null;
} 