import { ModelStateConfig } from 'src/app/core/model/model-state.config';
import { ModelState } from 'src/app/core/model/model.state';
import { Prop } from 'src/app/core/model/state.types';
import { Model } from 'src/app/core/models';

export function TrackByModel(prop: Prop<ModelState>){
    const identifier = ModelStateConfig.get(prop).identifier;
    return (index:number, model:Model): string => model[identifier];
}