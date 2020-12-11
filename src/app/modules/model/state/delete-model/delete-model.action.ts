import { Prop } from '@state/interfaces';
import { ModelStateAction } from '../model-state.action';

export class DeleteModelAction<TState> extends ModelStateAction<TState>{
    constructor(
        stateProp: Prop<TState>,
        public payload: {id?: any, ids?: any[]}
    ){ super(stateProp) }
}