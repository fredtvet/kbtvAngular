import { AdapterConstructor } from 'src/app/shared/form/adapter-constructor.interface';
import { ModelState } from 'src/app/core/services/model/interfaces';
import { SaveAction } from 'src/app/core/services/state/interfaces';
import { StateCommand } from 'src/app/core/services/state/interfaces/state-command.interface';
import { Prop } from 'src/app/shared-app/prop.type';

export interface SaveModelFormState {
    foreigns?: Partial<ModelState>
}

export interface ModelFormToSaveModelInput<TFormState> {
    formState: TFormState,
    foreigns?: Partial<ModelState>,
    stateProp: Prop<ModelState>,
    saveAction: SaveAction,
}

export interface ModelFormToSaveStateCommandAdapter<TFormState> 
    extends AdapterConstructor<
        ModelFormToSaveModelInput<TFormState>, 
        StateCommand
    >{} 
