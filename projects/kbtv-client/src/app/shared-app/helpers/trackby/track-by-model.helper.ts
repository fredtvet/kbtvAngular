
import { Model } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { ModelStateConfig } from '@model/model-state.config';
import { Prop } from 'global-types';

export function _trackByModel(prop: Prop<ModelState>){
    const identifier = ModelStateConfig.get(prop).identifier;
    return (index:number, model:Model): unknown => model[identifier];
}