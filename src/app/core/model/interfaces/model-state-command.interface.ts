import { StateCommand } from '../../state/state-http-converter/state-command.interface';
import { ModelState } from '../model.state';
import { Prop } from '../state.types';

export interface ModelStateCommand extends StateCommand{
    stateProp?: Prop<ModelState>;
}