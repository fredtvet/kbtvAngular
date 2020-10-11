import { Prop } from 'src/app/shared-app/prop.type';
import { AdapterConstructor } from '../../../form/interfaces/adapter-constructor.interface';
import { SaveAction } from '../../../state/interfaces';
import { StateCommand } from '../../../state/interfaces/state-command.interface';
import { ModelState } from '../../interfaces';

export interface ModelFormToSaveModelInput<TFormState> {
    formState: TFormState,
    stateProp: Prop<ModelState>,
    saveAction: SaveAction,
    foreigns?: Partial<ModelState>
}

export interface ModelFormToSaveStateCommandAdapter<TFormState> 
    extends AdapterConstructor<
        ModelFormToSaveModelInput<TFormState>, 
        StateCommand
    >{} 
