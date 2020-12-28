import { Prop } from 'global-types';
import { StateAction } from '@state/state.action';

export const ModelStateAction = "MODEL_STATE_ACTION";
export interface ModelStateAction<TState> extends StateAction{
    stateProp: Prop<TState>;
}