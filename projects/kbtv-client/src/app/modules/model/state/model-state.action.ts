import { Prop } from 'global-types';
import { StateAction } from 'state-management'

export const ModelStateAction = "MODEL_STATE_ACTION";
export interface ModelStateAction<TState> extends StateAction{
    stateProp: Prop<TState>;
}