import { SaveAction } from '@model/state/save-model/save-model-action.const';
import { Prop } from '@state/interfaces/prop.type';
import { StateAction } from '@state/interfaces';
import { AdapterConstructor } from '../../form/interfaces';

export interface ModelFormToSaveModelInput<TForm, TState> {
    formValue: TForm,
    options?: Partial<TState>,
    stateProp: Prop<TState>,
    saveAction: SaveAction,
}

export interface ModelFormToSaveStateCommandAdapter<TForm, TState> 
    extends AdapterConstructor<
        ModelFormToSaveModelInput<TForm, TState>, 
        StateAction
    >{} 
