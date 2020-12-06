import { Model } from 'src/app/core/models';
import { Prop } from 'src/app/shared-app/prop.type';
import { ModelState } from '../interfaces';
import { ModelStateConfig } from '../model-state.config';

export function _getModelDisplayValue(prop: Prop<ModelState>, value: Model): any {
    const fkPropModelMap = ModelStateConfig.get(prop)
    return fkPropModelMap ? value[fkPropModelMap.displayProp] : null;
} 