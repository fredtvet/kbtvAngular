import { Prop } from '@state/interfaces';
import { ModelStateConfig } from '../model-state.config';

export function _getModelDisplayValue<TState>(prop: Prop<TState>, value: any): any {
    const fkPropModelMap = ModelStateConfig.get(prop)
    return fkPropModelMap ? value[fkPropModelMap.displayProp] : null;
} 