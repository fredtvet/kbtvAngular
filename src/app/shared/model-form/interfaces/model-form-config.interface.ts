import { DynamicForm } from '@dynamic-forms/interfaces';
import { Prop } from '@state/interfaces/prop.type';
import { OptionsFormState } from '@shared/form';
import { ModelFormToSaveStateCommandAdapter } from './model-form-to-state-command-adapter.interface';

export interface ModelFormConfig<TState, TForm, TFormState extends OptionsFormState<Partial<TState>>>
{      
    entityId?: any;
    stateProp: Prop<TState>;
    dynamicForm: DynamicForm<TForm, TFormState>;
    adapter?: ModelFormToSaveStateCommandAdapter<TForm, TState>
}