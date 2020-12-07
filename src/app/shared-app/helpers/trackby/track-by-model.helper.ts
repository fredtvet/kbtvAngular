
import { Model } from '@core/models';
import { ModelState } from '@model/interfaces';
import { ModelStateConfig } from '@model/model-state.config';
import { Prop } from '@shared-app/prop.type';

export function _trackByModel(prop: Prop<ModelState>){
    const identifier = ModelStateConfig.get(prop).identifier;
    return (index:number, model:Model): any => model[identifier];
}