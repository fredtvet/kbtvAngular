
import { Model } from 'src/app/core/models';
import { ModelState } from 'src/app/core/services/model/interfaces';
import { ModelStateConfig } from 'src/app/core/services/model/model-state.config';
import { Prop } from 'src/app/shared-app/prop.type';

export function _trackByModel(prop: Prop<ModelState>){
    const identifier = ModelStateConfig.get(prop).identifier;
    return (index:number, model:Model): string => model[identifier];
}