import { Prop } from '@state/interfaces';
import { StateAction } from '@state/state.action';

export abstract class ModelStateAction<TState> extends StateAction{
    constructor(public stateProp: Prop<TState>){ super() };
}