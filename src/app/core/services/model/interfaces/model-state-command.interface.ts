import { Prop } from 'src/app/shared-app/prop.type';
import { StateCommand } from '../../state/state-http-converter';
import { ModelState } from './model-state.interface';

export interface ModelStateCommand extends StateCommand{
    stateProp?: Prop<ModelState>;
}