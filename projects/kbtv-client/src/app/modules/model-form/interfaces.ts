import { DynamicForm } from '@dynamic-forms/interfaces';
import { OptionsFormState } from '@form-sheet/interfaces';
import { Immutable, Maybe, Prop } from 'global-types';
import { SaveAction } from 'state-model';
import { StateAction } from 'state-management'

export type ActionConverter<TInput, TAction extends StateAction> = (input: Immutable<TInput>) => TAction;

export type FormToSaveModelConverter<TForm extends {}, TState extends {}, TAction extends StateAction> = 
    (input: ModelFormToSaveModelInput<TForm, TState>) => TAction

export interface ModelFormConfig<TState extends {}, TForm extends {}, TFormState extends OptionsFormState<Partial<TState>>>
{      
    entityId?: unknown;
    stateProp: Prop<TState>;
    dynamicForm: DynamicForm<TForm, TFormState>;
    actionConverter?: FormToSaveModelConverter<TForm, TState, StateAction>
}

export interface ModelFormToSaveModelInput<TForm extends {}, TState extends {}> {
    formValue: Immutable<TForm>,
    options?: Maybe<Immutable<Partial<TState>>>,
    stateProp: Prop<TState>,
    saveAction: SaveAction,
}