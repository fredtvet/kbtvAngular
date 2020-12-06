import { Prop } from 'src/app/shared-app/prop.type';
import { SaveAction } from '../../save-action.interface';
import { ModelState } from 'src/app/model/interfaces';
import { StateAction } from 'src/app/state/interfaces';
import { AdapterConstructor, OptionsFormState } from '../../form/interfaces';

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
        StateAction
    >{} 
