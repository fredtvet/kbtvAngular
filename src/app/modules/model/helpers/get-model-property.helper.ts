import { Model } from '@core/models';
import { Prop } from '@shared-app/prop.type';
import { ModelState } from '../interfaces';
import { ModelStateConfig } from '../model-state.config';

export function _getModelDisplayValue(prop: Prop<ModelState>, value: Model): any {
    const fkPropModelMap = ModelStateConfig.get(prop)
    return fkPropModelMap ? value[fkPropModelMap.displayProp] : null;
} 