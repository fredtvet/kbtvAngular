import { Prop } from './prop.type';
import { StateAction } from './state-action.interface';

export type ReducerFn<TState, TAction> = (state: Partial<TState>, action: TAction) => Partial<TState>

export interface Reducer<TState> {
    actionId: string;
    reducerFn: ReducerFn<TState, StateAction>;
    stateProperties?: ((action: Readonly<StateAction>) => Prop<TState>[]) | Prop<TState>[] | 'all';
    noDeepCloneState?: boolean;
    noDeepCloneAction?: boolean
}

export type ReducerMap = {[key: string]: Reducer<any>[]}



