import { Prop } from '@shared-app/prop.type';
import { StateAction } from '../../../state/interfaces/state-action.interface';
import { ModelState } from '../../interfaces/model-state.interface';

export interface ModelStateCommand extends StateAction{
    stateProp?: Prop<ModelState>;
}