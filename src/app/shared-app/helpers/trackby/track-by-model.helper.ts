
import { Model } from 'src/app/core/models';
import { ModelState } from 'src/app/model/interfaces';
import { ModelStateConfig } from 'src/app/model/model-state.config';
import { Prop } from 'src/app/shared-app/prop.type';

export function _trackByModel(prop: Prop<ModelState>){
    const identifier = ModelStateConfig.get(prop).identifier;
    return (index:number, model:Model): any => model[identifier];
}