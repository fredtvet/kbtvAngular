import { StateCommand } from '../../state/state-http-converter/state-command.interface';
import { ModelState } from '../model.state';


export interface ModelStateCommand extends StateCommand{
    stateProp?: keyof ModelState;
}