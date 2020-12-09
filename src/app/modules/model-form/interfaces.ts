import { DynamicForm } from '@dynamic-forms/interfaces';
import { Prop } from '@state/interfaces/prop.type';
import { StateAction } from '@state/interfaces';
import { SaveAction } from '@model/state/save-model/save-model-action.const';
import { OptionsFormState } from '@form-sheet/interfaces';

export interface AdapterConstructor<TInput, TOutput>{
    new(input: TInput): TOutput;     
}

export interface ModelFormConfig<TState, TForm, TFormState extends OptionsFormState<Partial<TState>>>
{      
    entityId?: any;
    stateProp: Prop<TState>;
    dynamicForm: DynamicForm<TForm, TFormState>;
    adapter?: ModelFormToSaveStateCommandAdapter<TForm, TState>
}

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

export interface ModelFormViewConfig<TModel, TState, TForm>{
    entity?: TModel;
    foreigns?: Partial<TState>;
    lockedValues?: Partial<TForm>; 
}