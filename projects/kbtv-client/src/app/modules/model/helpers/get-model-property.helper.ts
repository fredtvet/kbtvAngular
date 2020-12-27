import { Immutable } from '@global/interfaces';
import { Prop } from '@state/interfaces';
import { ModelStateConfig } from '../model-state.config';

export function _getModelDisplayValue<TState, TModel = {}>(prop: Immutable<Prop<TState>>, value: Immutable<TModel>): unknown {
    const fkPropModelMap = ModelStateConfig.get<TModel, TState>(prop)
    return fkPropModelMap ? value[ <Prop<Immutable<TModel>>> fkPropModelMap.displayProp] : null;
} 