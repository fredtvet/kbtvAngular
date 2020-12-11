import { Prop } from '@state/interfaces';
import { ModelStateAction } from '../model-state.action';

export class MailModelsAction<TState> extends ModelStateAction<TState> {
    constructor(
        stateProp: Prop<TState>,
        public ids: any[],
        public toEmail: string
    ){ super(stateProp) }
}