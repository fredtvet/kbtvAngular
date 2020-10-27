import { AdapterConstructor } from 'src/app/shared/form/adapter-constructor.interface';
import { ModelState } from 'src/app/core/services/model/interfaces';
import { SaveAction } from 'src/app/core/services/state/interfaces';
import { StateCommand } from 'src/app/core/services/state/interfaces/state-command.interface';
import { Prop } from 'src/app/shared-app/prop.type';
import { OptionsFormState } from '../../form/options-form-state.interface';

export interface SaveModelFormState<TOptions extends Partial<ModelState>> extends OptionsFormState<TOptions>{ }

export interface ModelFormToSaveModelInput<TFormState> {
    formState: TFormState,
    options?: Partial<ModelState>,
    stateProp: Prop<ModelState>,
    saveAction: SaveAction,
}

export interface ModelFormToSaveStateCommandAdapter<TFormState> 
    extends AdapterConstructor<
        ModelFormToSaveModelInput<TFormState>, 
        StateCommand
    >{} 
