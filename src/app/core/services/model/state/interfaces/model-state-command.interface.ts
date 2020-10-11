import { Prop } from 'src/app/shared-app/prop.type';
import { StateCommand } from '../../../state/interfaces/state-command.interface';
import { ModelState } from '../../interfaces/model-state.interface';

export interface ModelStateCommand extends StateCommand{
    stateProp?: Prop<ModelState>;
}