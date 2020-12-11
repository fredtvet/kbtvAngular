
import { SaveAction } from '@model/interfaces';
import { Prop } from '@state/interfaces';
import { ModelStateAction } from '../model-state.action';

export class SaveModelAction<TModel, TState> extends ModelStateAction<TState>{
    constructor(
        stateProp: Prop<TState>,
        public entity: TModel,
        public saveAction: SaveAction,  
        public apiUrlOverride?: string
    ){ super(stateProp) }
}

