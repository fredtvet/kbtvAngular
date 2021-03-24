
import { Model } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { ModelStateConfig } from 'state-model';
import { Prop } from 'global-types';

export function _trackByModel(prop: Prop<ModelState>){
    const idProp = ModelStateConfig.get(prop).idProp;
    return (index:number, model:Model): unknown => model[idProp];
}